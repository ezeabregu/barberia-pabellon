import { useState, useMemo } from "react";
import { useModal } from "../../components/modal/useModal";
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

const ADMIN_PASS = "1234";

const initialBookings = [
  {
    nombre: "Carlos Pérez",
    servicio: "Corte + Barba",
    hora: "09:00",
    barbero: "Nahuel",
    precio: "$5.500",
    estado: "confirmed",
    tel: "5493510001111",
  },
  {
    nombre: "Tomás García",
    servicio: "Degradado",
    hora: "09:50",
    barbero: "Tomás",
    precio: "$4.000",
    estado: "new",
    tel: "5493510002222",
  },
  {
    nombre: "Nico Rodríguez",
    servicio: "Corte Clásico",
    hora: "10:30",
    barbero: "Facundo",
    precio: "$3.500",
    estado: "new",
    tel: "5493510003333",
  },
];

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [pass, setPass] = useState("");
  const [bookings] = useState(initialBookings);
  const { mostrarModal, ModalComponent } = useModal();

  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = useMemo(() => {
    const total = bookings.length;
    const nuevos = bookings.filter((b) => b.estado === "new").length;
    const ingresos = bookings.reduce(
      (sum, b) => sum + parseInt(b.precio.replace(/\D/g, ""), 10),
      0,
    );
    return {
      total,
      nuevos,
      ingresos: `$${ingresos.toLocaleString("es-AR")}`,
    };
  }, [bookings]);

  const checkAdmin = () => {
    if (pass === ADMIN_PASS) {
      setAuthenticated(true);
    } else {
      mostrarModal("Contraseña incorrecta");
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setPass("");
  };

  const notifyClient = (nombre, hora, tel) => {
    const msg = `Hola ${nombre}! ✂ Te confirmo tu turno en *Barbería Pabellón* para las *${hora}hs* de hoy. ¡Te esperamos!`;
    window.open(
      `https://wa.me/${tel}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
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
            />
            <ButtonPrimary onClick={checkAdmin}>Ingresar</ButtonPrimary>
          </LoginCard>
        ) : (
          <AdminSection>
            <AdminHeader>
              <AdminHeaderLeft>
                <AdminTitle>Turnos del Día</AdminTitle>
                <AdminDateLabel>{today}</AdminDateLabel>
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
                  {bookings.map((b) => (
                    <tr key={b.tel}>
                      <td className="cliente">{b.nombre}</td>
                      <td>{b.servicio}</td>
                      <td className="hora">{b.hora}hs</td>
                      <td>{b.barbero}</td>
                      <td>
                        <StatusBadge $estado={b.estado}>
                          {b.estado === "new" ? "Nuevo" : "Confirmado"}
                        </StatusBadge>
                      </td>
                      <td>
                        <ButtonSendWa
                          onClick={() =>
                            notifyClient(b.nombre, b.hora, b.tel)
                          }
                        >
                          📲 Notificar
                        </ButtonSendWa>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </BookingsTable>
            </TableWrapper>

            <AdminFooterNote>
              Los turnos aquí son de demostración. Con backend, todos los
              turnos se guardarían en la base de datos.
            </AdminFooterNote>
          </AdminSection>
        )}
      </Section>
      {ModalComponent}
    </AdminContainer>
  );
};

export default Admin;
