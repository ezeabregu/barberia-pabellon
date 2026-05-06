import { useState, useEffect } from "react";
import { useModal } from "../../components/modal/useModal";
import { api } from "../../lib/api";
import { normalizeArPhone } from "../../lib/phone";
import {
  TurnoContainer,
  SectionContainer,
  SectionTitle,
  SectionSub,
  BookingSection,
  BookingGrid,
  Steps,
  Step,
  StepServicesContainer,
  StepDateTimeContainer,
  StepPersonalContainer,
  TitleServicesContainer,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ServiceName,
  ServicePrice,
  ServiceTime,
  ButtonPrimary,
  FormGroupContainer,
  ButtonContainer,
  ButtonOutline,
  TimeGridContainer,
  TimeButton,
  BookingSummaryContainer,
  SummaryRowContainer,
  SpanVal,
  SummaryRowTotalContainer,
  ButtonsStep3Container,
  ButtonWhastapp,
  WhatsappIcon,
  SuccessStateContainer,
  SuccessIconContainer,
} from "./turnoStyles";

const Turno = () => {
  const [fecha, setFecha] = useState("");
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [barbero, setBarbero] = useState("Cualquiera");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [notas, setNotas] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { mostrarModal, ModalComponent } = useModal();

  const times = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];
  const [takenTimes, setTakenTimes] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  useEffect(() => {
    if (!fecha) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingAvailability(true);
    api
      .getAvailability(fecha)
      .then((data) => {
        if (!cancelled) setTakenTimes(data.taken || []);
      })
      .catch(() => {
        if (!cancelled) setTakenTimes([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingAvailability(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fecha]);

  const getToday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const [y, m, d] = date.split("-");
    return `${d}/${m}/${y}`;
  };

  const isPastTime = (time) => {
    if (fecha !== getToday()) return false;

    const now = getCurrentTime();

    return time < now;
  };

  const goToStep2 = () => {
    if (!selectedService) {
      mostrarModal("Por favor elegí un servicio");
      return;
    }

    setStep(2);
    setFecha(getToday());
  };

  const backToStep1 = () => {
    setStep(1);
    setSelectedTime(null);
  };

  const backToStep2 = () => {
    setStep(2);
  };

  const goToStep3 = () => {
    if (!selectedTime) {
      mostrarModal("Por favor elegí un horario");
      return;
    }

    setStep(3);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedTime(null);
    setFecha(getToday());
    setBarbero("Cualquiera");
    setNombre("");
    setApellido("");
    setTelefono("");
    setNotas("");
  };

  const sendWhatsApp = async () => {
    if (!nombre.trim() || !telefono.trim()) {
      mostrarModal("Por favor completá nombre y WhatsApp");
      return;
    }

    const normalizedPhone = normalizeArPhone(telefono);
    if (!normalizedPhone) {
      mostrarModal(
        "El WhatsApp debe incluir el código de área. Ej: 351 558 5216 o +54 9 351 558 5216",
      );
      return;
    }

    const waWindow = window.open("about:blank", "_blank");

    setSubmitting(true);
    try {
      await api.createBooking({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: normalizedPhone,
        servicio: selectedService.name,
        precio: selectedService.price,
        duracion: selectedService.duration,
        fecha,
        hora: selectedTime,
        barbero,
        notas: notas.trim(),
      });

      const formatDateLocal = (date) => {
        const [y, m, d] = date.split("-");
        return `${d}/${m}/${y}`;
      };

      const msg = `💈 *Barbería Pabellón*

Hola! Quiero reservar un turno 👇

👤 *Cliente:* ${nombre} ${apellido}
📱 *Tel:* ${telefono}

✂ *Servicio:* ${selectedService?.name}
💰 *Precio:* ${selectedService?.price}

📅 *Fecha:* ${formatDateLocal(fecha)}
⏰ *Hora:* ${selectedTime}hs
👨‍🔧 *Barbero:* ${barbero}
${notas ? `\n📝 *Notas:* ${notas}\n` : ""}
Gracias! 🙌`;

      const url = `https://wa.me/5493513931888?text=${encodeURIComponent(msg)}`;
      if (waWindow && !waWindow.closed) {
        waWindow.location.href = url;
      } else {
        window.location.href = url;
      }
      setStep(4);
    } catch (err) {
      if (waWindow && !waWindow.closed) waWindow.close();
      if (err.status === 409) {
        setTakenTimes((curr) =>
          curr.includes(selectedTime) ? curr : [...curr, selectedTime],
        );
        setSelectedTime(null);
        setStep(2);
        mostrarModal("Ese horario se acaba de reservar. Elegí otro, por favor.");
      } else {
        mostrarModal(
          err.message || "No se pudo guardar el turno. Intentá de nuevo.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TurnoContainer id="page-booking">
      <SectionContainer>
        <SectionTitle>Reservá tu Turno</SectionTitle>
        <SectionSub>Rápido y sin complicaciones</SectionSub>

        <BookingSection id="booking-form-wrap">
          <Steps>
            <Step data-num="1" $active={step === 1} $done={step > 1}>
              Servicio
            </Step>
            <Step data-num="2" $active={step === 2} $done={step > 2}>
              Fecha y Hora
            </Step>
            <Step data-num="3" $active={step === 3} $done={step > 3}>
              Tus Datos
            </Step>
          </Steps>

          {step === 1 && (
            <StepServicesContainer>
              <TitleServicesContainer>Elegí el servicio</TitleServicesContainer>
              <ServicesGrid>
                <ServiceCard
                  onClick={() =>
                    setSelectedService({
                      name: "Corte Clásico",
                      price: "$9.000",
                      duration: "30 minutos",
                    })
                  }
                  $selected={selectedService?.name === "Corte Clásico"}
                >
                  <ServiceIcon>✂</ServiceIcon>
                  <ServiceName>Corte Clásico</ServiceName>
                  <ServicePrice>$9.000</ServicePrice>
                  <ServiceTime>30 minutos</ServiceTime>
                </ServiceCard>
                <ServiceCard
                  onClick={() =>
                    setSelectedService({
                      name: "Fade / Degradé",
                      price: "$9.000",
                      duration: "20 minutos",
                    })
                  }
                  $selected={selectedService?.name === "Fade / Degradé"}
                >
                  <ServiceIcon>🪒</ServiceIcon>
                  <ServiceName>Fade / Degradé</ServiceName>
                  <ServicePrice>$9.000</ServicePrice>
                  <ServiceTime>20 minutos</ServiceTime>
                </ServiceCard>
                <ServiceCard
                  onClick={() =>
                    setSelectedService({
                      name: "Barba y perfilado",
                      price: "$11.000",
                      duration: "50 minutos",
                    })
                  }
                  $selected={selectedService?.name === "Barba y perfilado"}
                >
                  <ServiceIcon>💈</ServiceIcon>
                  <ServiceName>Barba y perfilado</ServiceName>
                  <ServicePrice>$11.000</ServicePrice>
                  <ServiceTime>50 minutos</ServiceTime>
                </ServiceCard>
                <ServiceCard
                  onClick={() =>
                    setSelectedService({
                      name: "Afeitado",
                      price: "$4.000",
                      duration: "40 minutos",
                    })
                  }
                  $selected={selectedService?.name === "Afeitado"}
                >
                  <ServiceIcon>⚡</ServiceIcon>
                  <ServiceName>Afeitado</ServiceName>
                  <ServicePrice>$4.000</ServicePrice>
                  <ServiceTime>40 minutos</ServiceTime>
                </ServiceCard>
                <ServiceCard
                  onClick={() =>
                    setSelectedService({
                      name: "Color",
                      price: "$50.000",
                      duration: "2/3 horas",
                    })
                  }
                  $selected={selectedService?.name === "Color"}
                >
                  <ServiceIcon>⚡</ServiceIcon>
                  <ServiceName>Color</ServiceName>
                  <ServicePrice>$50.000</ServicePrice>
                  <ServiceTime>2/3 horas</ServiceTime>
                </ServiceCard>
              </ServicesGrid>
              <ButtonPrimary onClick={goToStep2}>Continuar →</ButtonPrimary>
            </StepServicesContainer>
          )}

          {step === 2 && (
            <StepDateTimeContainer>
              <BookingGrid>
                <FormGroupContainer>
                  <label>Fecha</label>
                  <input
                    type="date"
                    value={fecha}
                    min={getToday()}
                    onChange={(e) => {
                      setFecha(e.target.value);
                      setSelectedTime(null);
                    }}
                  />
                </FormGroupContainer>
                <FormGroupContainer>
                  <label>Barbero</label>
                  <select
                    value={barbero}
                    onChange={(e) => setBarbero(e.target.value)}
                  >
                    <option value="Cualquiera">Cualquier barbero</option>
                    <option value="Tomás">Tomás</option>
                    <option value="Nahuel">Nahuel</option>
                    <option value="Facundo">Facundo</option>
                  </select>
                </FormGroupContainer>
              </BookingGrid>
              <FormGroupContainer style={{ marginTop: "1rem" }}>
                <label>
                  Horario disponible
                  {loadingAvailability && " (cargando...)"}
                </label>
                <TimeGridContainer id="time-grid" key={fecha}>
                  {times.map((t) => {
                    const isTaken = takenTimes.includes(t);
                    const isPast = isPastTime(t);
                    const isDisabled = isTaken || isPast || loadingAvailability;
                    const isSelected = selectedTime === t;

                    return (
                      <TimeButton
                        key={t}
                        $selected={isSelected}
                        $taken={isDisabled}
                        disabled={isDisabled}
                        onClick={() => setSelectedTime(t)}
                      >
                        {t}
                      </TimeButton>
                    );
                  })}
                </TimeGridContainer>
              </FormGroupContainer>
              <ButtonContainer>
                <ButtonOutline onClick={backToStep1} style={{ flex: "1" }}>
                  ← Volver
                </ButtonOutline>
                <ButtonPrimary onClick={goToStep3} style={{ flex: "2" }}>
                  Continuar →
                </ButtonPrimary>
              </ButtonContainer>
            </StepDateTimeContainer>
          )}

          {step === 3 && (
            <StepPersonalContainer>
              <BookingGrid>
                <FormGroupContainer>
                  <label>Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </FormGroupContainer>
                <FormGroupContainer>
                  <label>Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    placeholder="Tu apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </FormGroupContainer>
                <FormGroupContainer>
                  <label>WhatsApp</label>
                  <input
                    type="tel"
                    id="telefono"
                    placeholder="351 558 5216 (con código de área)"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </FormGroupContainer>
                <FormGroupContainer>
                  <label>Notas adicionales (opcional)</label>
                  <input
                    type="text"
                    id="notas"
                    placeholder="Ej: corte corto por los costados..."
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                  />
                </FormGroupContainer>
              </BookingGrid>
              <BookingSummaryContainer id="summary-box">
                <SummaryRowContainer>
                  <span>Servicio</span>
                  <SpanVal>{selectedService?.name}</SpanVal>
                </SummaryRowContainer>

                <SummaryRowContainer>
                  <span>Duración</span>
                  <SpanVal>{selectedService?.duration}</SpanVal>
                </SummaryRowContainer>

                <SummaryRowContainer>
                  <span>Fecha</span>
                  <SpanVal>{formatDate(fecha)}</SpanVal>
                </SummaryRowContainer>

                <SummaryRowContainer>
                  <span>Hora</span>
                  <SpanVal>{selectedTime}hs</SpanVal>
                </SummaryRowContainer>

                <SummaryRowContainer>
                  <span>Barbero</span>
                  <SpanVal>{barbero}</SpanVal>
                </SummaryRowContainer>

                <SummaryRowTotalContainer>
                  <span>Total</span>
                  <SpanVal>{selectedService?.price}</SpanVal>
                </SummaryRowTotalContainer>
              </BookingSummaryContainer>
              <ButtonsStep3Container>
                <ButtonOutline style={{ flex: 1 }} onClick={backToStep2}>
                  ← Volver
                </ButtonOutline>
                <ButtonWhastapp
                  style={{ flex: 2 }}
                  onClick={sendWhatsApp}
                  disabled={submitting}
                >
                  <WhatsappIcon viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </WhatsappIcon>
                  {submitting ? "Enviando..." : "Confirmar por WhatsApp"}
                </ButtonWhastapp>
              </ButtonsStep3Container>
            </StepPersonalContainer>
          )}

          {step === 4 && (
            <SuccessStateContainer>
              <SuccessIconContainer>✓</SuccessIconContainer>
              <h3>¡Turno Solicitado!</h3>
              <p>
                Se abrió WhatsApp con tu reserva.
                <br />
                En breve el barbero te confirma.
              </p>
              <ButtonPrimary onClick={resetBooking}>
                Nueva Reserva
              </ButtonPrimary>
            </SuccessStateContainer>
          )}
        </BookingSection>
      </SectionContainer>
      {ModalComponent}
    </TurnoContainer>
  );
};

export default Turno;
