import {
  HomeContainer,
  HeroCta,
  HeroTag,
  ButtonPrimary,
  ButtonOutline,
  Divider,
  Section,
  SectionTitle,
  SectionSub,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ServiceName,
  ServicePrice,
  ServiceTime,
  ImageContainer,
} from "./homeStyles";
import imagenLogo from "../../../public/image/logo_barberia_pabellon.jpg";
import { useRef } from "react";
import SocialMedia from "../../components/socialMedia/SocialMedia";

const Home = () => {
  const servicesRef = useRef(null);
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="page-home" class="page active">
      <HomeContainer>
        <HeroTag>✦ Barbería Premium ✦</HeroTag>
        <ImageContainer>
          <img src={imagenLogo} />
        </ImageContainer>
        <h1>
          El arte del buen
          <br />
          <em>corte de pelo</em>
        </h1>
        <p>
          Reservá tu turno en minutos. Te confirmamos por WhatsApp de inmediato.
        </p>
        <HeroCta>
          <ButtonPrimary to="/turno">Reservar Ahora</ButtonPrimary>
          <ButtonOutline onClick={scrollToServices}>
            Ver Servicios
          </ButtonOutline>
        </HeroCta>
      </HomeContainer>
      <Divider />
      <Section ref={servicesRef}>
        <SectionTitle>Nuestros Servicios</SectionTitle>
        <SectionSub>Elige tu experiencia</SectionSub>
        <ServicesGrid>
          <ServiceCard to="/turno">
            <ServiceIcon>✂</ServiceIcon>
            <ServiceName>Corte Clásico</ServiceName>
            <ServicePrice>$9.000</ServicePrice>
            <ServiceTime>30 minutos</ServiceTime>
          </ServiceCard>
          <ServiceCard to="/turno">
            <ServiceIcon>🪒</ServiceIcon>
            <ServiceName>Fade / Degradé</ServiceName>
            <ServicePrice>$9.000</ServicePrice>
            <ServiceTime>20 minutos</ServiceTime>
          </ServiceCard>
          <ServiceCard to="/turno">
            <ServiceIcon>💈</ServiceIcon>
            <ServiceName>Barba y perfilado</ServiceName>
            <ServicePrice>$11.000</ServicePrice>
            <ServiceTime>50 minutos</ServiceTime>
          </ServiceCard>
          <ServiceCard to="/turno">
            <ServiceIcon>⚡</ServiceIcon>
            <ServiceName>Afeitado</ServiceName>
            <ServicePrice>$4.000</ServicePrice>
            <ServiceTime>40 minutos</ServiceTime>
          </ServiceCard>
          <ServiceCard to="/turno">
            <ServiceIcon>🖌️</ServiceIcon>
            <ServiceName>Color</ServiceName>
            <ServicePrice>$50.000</ServicePrice>
            <ServiceTime>2/3 horas</ServiceTime>
          </ServiceCard>
        </ServicesGrid>
      </Section>
      <Divider />
      <SectionTitle>Nuestras Redes Sociales</SectionTitle>
      <SectionSub>
        Seguinos y llevá tu estilo al siguiente nivel. Inspiración, tips y
        turnos en un solo lugar
      </SectionSub>
      <SocialMedia />
    </div>
  );
};

export default Home;
