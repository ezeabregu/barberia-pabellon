import styled from "styled-components";

export const TurnoContainer = styled.div`
  //display: none;
`;

export const SectionContainer = styled.div`
  padding: 3rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

export const SectionTitle = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const SectionSub = styled.div`
  color: var(--text-muted);
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
`;

export const BookingSection = styled.div`
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 760px;
  margin: 2rem auto;
`;

export const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`;

/* STEPS */

export const Steps = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  counter-reset: step;
`;

export const Step = styled.div`
  flex: 1;
  position: relative;
  text-align: center;
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;

  &::before {
    content: attr(data-num);
    display: block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--border);
    margin: 0 auto 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
  }
  &.done::before {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--dark);
  }
  &.active::before {
    border-color: var(--gold);
    color: var(--gold);
  }
  &::after {
    content: "";
    position: absolute;
    top: 14px;
    left: calc(50% + 14px);
    right: calc(-50% + 14px);
    height: 1px;
    background: var(--border);
  }
  &:last-child::after {
    display: none;
  }

  ${({ $done }) =>
    $done &&
    `
    &::before {
      background: var(--gold);
      border-color: var(--gold);
      color: var(--dark);
    }
  `}

  ${({ $active }) =>
    $active &&
    `
    &::before {
      border-color: var(--gold);
      color: var(--gold);
    }
  `}
`;

export const StepServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StepDateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StepPersonalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleServicesContainer = styled.div`
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const ServiceCard = styled.button`
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  text-decoration: none;

  /* reset del botón */
  appearance: none;
  outline: none;

  font: inherit;

  &,
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--gold);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.2s;
  }

  &:hover {
    border-color: rgba(201, 168, 76, 0.5);
    background: var(--dark3);
  }

  ${({ $selected }) =>
    $selected &&
    `
    border-color: rgba(201, 168, 76, 0.5);
    background: var(--dark3);
  `}
  ${({ $selected }) =>
    $selected &&
    `
    &::after {
      transform: scaleX(1);
    }
  `}
    &.selected::after {
    transform: scaleX(1);
  }

  &:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 2px rgba(201, 168, 76, 0.3);
  }
`;

export const ServiceIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
`;

export const ServiceName = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

export const ServicePrice = styled.div`
  color: var(--gold);
  font-size: 1.2rem;
  font-weight: 500;
`;

export const ServiceTime = styled.div`
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

export const ButtonPrimary = styled.button`
  background: var(--gold);
  color: var(--dark);
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
  }
`;

export const FormGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .full {
    grid-column: 1/-1;
  }

  label {
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  input,
  select,
  textarea {
    background: var(--dark3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.8rem 1rem;
    color: var(--text);
    font-family: "DM Sans", sans-serif;
    font-size: 0.95rem;
    transition: border 0.2s;
    outline: none;
    -webkit-appearance: none;
  }
  select option {
    background: var(--dark3);
  }
  input:focus,
  select:focus,
  textarea:focus {
    border-color: rgba(201, 168, 76, 0.6);
  }
  input::placeholder {
    color: var(--text-muted);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const ButtonsStep3Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const ButtonOutline = styled.button`
  background: transparent;
  color: var(--gold);
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid var(--border);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;

  &:hover {
    border-color: var(--gold);
    background: rgba(201, 168, 76, 0.05);
  }
`;

export const TimeGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 0.3rem;
`;

export const TimeButton = styled.button`
  background: var(--dark3);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.6rem;
  color: var(--text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: "DM Sans", sans-serif;

  background: ${({ $selected }) =>
    $selected ? "rgba(201, 168, 76, 0.15)" : "var(--dark3)"};

  border: 1px solid
    ${({ $selected }) => ($selected ? "var(--gold)" : "var(--border)")};

  color: ${({ $selected }) =>
    $selected ? "var(--gold)" : "var(--text-muted)"};

  opacity: ${({ $taken }) => ($taken ? 0.3 : 1)};
  cursor: ${({ $taken }) => ($taken ? "not-allowed" : "pointer")};

  text-decoration: ${({ $taken }) => ($taken ? "line-through" : "none")};

  ${({ $taken }) =>
    !$taken &&
    `
    &:hover {
      border-color: rgba(201, 168, 76, 0.4);
      color: var(--text);
      transform: translateY(-1px);
    }
  `}
`;

export const BookingSummaryContainer = styled.div`
  background: var(--dark);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.2rem;
  margin: 1.5rem 0;
`;

export const SummaryRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 0.3rem 0;
`;

export const SpanVal = styled.span`
  color: var(--gold);
`;

export const SummaryRowTotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 0.3rem 0;
  border-top: 1px solid var(--border);
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  font-family: "Playfair Display", serif;
  font-size: 1.1rem;
`;

export const ButtonWhastapp = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #25d366, #128c7e);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  font-family: "DM Sans", sans-serif;
  margin-top: 0.5rem;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

export const WhatsappIcon = styled.svg`
  width: 22px;
  height: 22px;
`;

//   /* SUCCESS */
export const SuccessStateContainer = styled.div`
  text-align: center;
  padding: 2rem;

  h3 {
    font-family: "Playfair Display", serif;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }
  p {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

export const SuccessIconContainer = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(37, 211, 102, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
  font-size: 1.8rem;
`;
