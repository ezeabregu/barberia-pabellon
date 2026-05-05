import { useState, useEffect, useMemo, useCallback } from "react";
import { useModal } from "../../components/modal/useModal";
import { api, tokenStorage } from "../../lib/api";
import {
  AdminContainer,
  Section,
  SectionTitle,
  SectionSub,
  LoginCard,
  LoginText,
  LoginInput,
  ButtonPrimary,
  ButtonOutline,
  AdminSection,
  AdminHeader,
  AdminHeaderLeft,
  AdminHeaderRight,
  AdminTitle,
  AdminDateLabel,
  AdminBadge,
  AdminStats,
  StatCard,
  StatNum,
  StatLabel,
  TableWrapper,
  BookingsTable,
  StatusBadge,
  ButtonSendWa,
  AdminFooterNote,
} from "./adminStyles";

const formatTodayISO = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(() =>
    Boolean(tokenStorage.get()),
  );
  const [pass, setPass] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const { mostrarModal, ModalComponent } = useModal();

  const todayISO = useMemo(() => formatTodayISO(), []);
  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString("es-AR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [],
  );

  const fetchBookings = useCallback(async () => {
    setLoadingBookings(true);
    try {
      const data = await api.getBookings({ fecha: todayISO });
      setBookings(data.items || []);
    } catch (err) {
      if (err.status === 401) {
        tokenStorage.clear();
        setAuthenticated(false);
        mostrarModal("Sesión expirada, ingresá de nuevo");
      } else {
        mostrarModal(err.message || "No se pudieron cargar los turnos");
      }
    } finally {
      setLoadingBookings(false);
    }
  }, [todayISO, mostrarModal]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (tokenStorage.get()) fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const total = bookings.length;
    const nuevos = bookings.filter((b) => b.estado === "new").length;
    const ingresos = bookings.reduce(
      (sum, b) => sum + parseInt(String(b.precio).replace(/\D/g, ""), 10) || 0,
      0,
    );
    return {
      total,
      nuevos,
      ingresos: `$${ingresos.toLocaleString("es-AR")}`,
    };
  }, [bookings]);

  const checkAdmin = async () => {
    if (!pass) return;
    setLoggingIn(true);
    try {
      const { token } = await api.loginAdmin(pass);
      tokenStorage.set(token);
      setAuthenticated(true);
      setPass("");
      fetchBookings();
    } catch (err) {
      mostrarModal(err.message || "Error al ingresar");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => {
    tokenStorage.clear();
    setAuthenticated(false);
    setBookings([]);
  };

  const notifyClient = async (booking) => {
    const msg = `Hola ${booking.nombre}! ✂ Te confirmo tu turno en *Barbería Pabellón* para las *${booking.hora}hs* de hoy. ¡Te esperamos!`;
    window.open(
      `https://wa.me/${booking.telefono}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );

    if (booking.estado === "new") {
      try {
        const updated = await api.updateBookingStatus(booking._id, "confirmed");
        setBookings((curr) =>
          curr.map((b) => (b._id === booking._id ? updated : b)),
        );
      } catch {
        mostrarModal(
          "Se abrió WhatsApp pero no se pudo marcar el turno como confirmado",
        );
      }
    }
  };

  return (
    <AdminContainer>
      <Section>
        {!authenticated ? (
          <LoginCard>
            <SectionTitle>Panel Administrador</SectionTitle>
            <SectionSub>Acceso Restringido</SectionSub>
            <LoginText>Contraseña de acceso</LoginText>
            <LoginInput
              type="password"
              placeholder="••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAdmin()}
              disabled={loggingIn}
            />
            <ButtonPrimary onClick={checkAdmin} disabled={loggingIn}>
              {loggingIn ? "Ingresando..." : "Ingresar"}
            </ButtonPrimary>
          </LoginCard>
        ) : (
          <AdminSection>
            <AdminHeader>
              <AdminHeaderLeft>
                <AdminTitle>Turnos del Día</AdminTitle>
                <AdminDateLabel>{todayLabel}</AdminDateLabel>
              </AdminHeaderLeft>
              <AdminHeaderRight>
                <AdminBadge>Admin</AdminBadge>
                <ButtonOutline onClick={logout}>Salir</ButtonOutline>
              </AdminHeaderRight>
            </AdminHeader>

            <AdminStats>
              <StatCard>
                <StatNum>{stats.total}</StatNum>
                <StatLabel>Turnos hoy</StatLabel>
              </StatCard>
              <StatCard>
                <StatNum>{stats.nuevos}</StatNum>
                <StatLabel>Nuevos</StatLabel>
              </StatCard>
              <StatCard>
                <StatNum>{stats.ingresos}</StatNum>
                <StatLabel>Proyectado</StatLabel>
              </StatCard>
            </AdminStats>

            <TableWrapper>
              <BookingsTable>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Servicio</th>
                    <th>Hora</th>
                    <th>Barbero</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingBookings ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)" }}>
                        Cargando turnos...
                      </td>
                    </tr>
                  ) : bookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)" }}>
                        No hay turnos para hoy
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b._id}>
                        <td className="cliente">
                          {b.nombre} {b.apellido}
                        </td>
                        <td>{b.servicio}</td>
                        <td className="hora">{b.hora}hs</td>
                        <td>{b.barbero}</td>
                        <td>
                          <StatusBadge $estado={b.estado}>
                            {b.estado === "new" ? "Nuevo" : "Confirmado"}
                          </StatusBadge>
                        </td>
                        <td>
                          <ButtonSendWa onClick={() => notifyClient(b)}>
                            📲 Notificar
                          </ButtonSendWa>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </BookingsTable>
            </TableWrapper>

            <AdminFooterNote>
              Los turnos se actualizan en tiempo real desde la base de datos.
            </AdminFooterNote>
          </AdminSection>
        )}
      </Section>
      {ModalComponent}
    </AdminContainer>
  );
};

export default Admin;
