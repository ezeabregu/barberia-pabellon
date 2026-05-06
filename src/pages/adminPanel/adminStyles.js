import styled from "styled-components";

export const AdminContainer = styled.div``;

export const Section = styled.div`
  padding: 3rem 2rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1.2rem;
  }
`;

export const SectionTitle = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const SectionSub = styled.div`
  color: var(--text-muted);
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    letter-spacing: 1.5px;
  }
`;

/* LOGIN */

export const LoginCard = styled.div`
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  max-width: 420px;
  margin: 2rem auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
`;

export const LoginText = styled.p`
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-top: 1rem;
`;

export const LoginInput = styled.input`
  background: var(--dark3);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  color: var(--text);
  font-family: "DM Sans", sans-serif;
  width: 250px;
  text-align: center;
  letter-spacing: 4px;
  font-size: 1.1rem;
  outline: none;
  display: block;
  margin: 1rem auto;
  transition: border 0.2s;

  &:focus {
    border-color: rgba(201, 168, 76, 0.6);
  }

  &::placeholder {
    color: var(--text-muted);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
  }
`;

export const ButtonPrimary = styled.button`
  background: var(--gold);
  color: var(--dark);
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
  }
`;

export const ButtonOutline = styled.button`
  background: transparent;
  color: var(--gold);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid var(--border);
  cursor: pointer;
  font-size: 0.75rem;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;

  &:hover {
    border-color: var(--gold);
    background: rgba(201, 168, 76, 0.05);
  }
`;

/* PANEL */

export const AdminSection = styled.div`
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;

  @media (max-width: 768px) {
    padding: 1.2rem;
    border-radius: 12px;
  }
`;

export const AdminHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }
`;

export const AdminHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AdminHeaderRight = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const AdminTitle = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  margin-bottom: 0.3rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const AdminDateLabel = styled.div`
  color: var(--text-muted);
  font-size: 0.8rem;
  text-transform: capitalize;
`;

export const AdminDateInput = styled.input`
  background: var(--dark3);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.45rem 0.7rem;
  color: var(--text);
  font-family: "DM Sans", sans-serif;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
  color-scheme: dark;
  transition: border 0.2s;

  &:focus {
    border-color: rgba(201, 168, 76, 0.6);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.7) sepia(1) hue-rotate(15deg) saturate(2);
    cursor: pointer;
  }

  @media (max-width: 600px) {
    flex: 1;
    min-width: 0;
  }
`;

export const AdminBadge = styled.span`
  background: rgba(201, 168, 76, 0.1);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);

  @media (max-width: 600px) {
    display: none;
  }
`;

export const AdminStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    gap: 0.5rem;
    margin-bottom: 1.2rem;
  }
`;

export const StatCard = styled.div`
  background: var(--dark);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.2rem;
  text-align: center;

  @media (max-width: 600px) {
    padding: 0.8rem 0.4rem;
  }
`;

export const StatNum = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  color: var(--gold);

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.2rem;

  @media (max-width: 600px) {
    font-size: 0.62rem;
    letter-spacing: 0.5px;
  }
`;

/* TABLE */

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const BookingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  th {
    text-align: left;
    font-size: 0.72rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid var(--border);
    font-weight: 500;
  }

  td {
    padding: 0.8rem;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(201, 168, 76, 0.06);
  }

  tr:hover td {
    background: var(--dark3);
  }

  td.cliente {
    font-weight: 500;
  }

  td.hora {
    color: var(--gold);
  }

  @media (max-width: 600px) {
    min-width: 0;

    thead {
      display: none;
    }

    tbody {
      display: block;
    }

    tr {
      display: block;
      background: var(--dark);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 0.9rem 1rem;
      margin-bottom: 0.7rem;
    }

    tr:hover td {
      background: transparent;
    }

    td {
      display: block;
      border: none;
      padding: 0.35rem 0;
      font-size: 0.88rem;
    }

    td.cliente {
      font-size: 1rem;
      font-weight: 600;
      padding: 0 0 0.5rem 0;
      margin-bottom: 0.4rem;
      border-bottom: 1px solid rgba(201, 168, 76, 0.1);
    }

    td[data-label] {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.8rem;
    }

    td[data-label]::before {
      content: attr(data-label);
      color: var(--text-muted);
      font-size: 0.68rem;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    td.action {
      padding: 0.7rem 0 0;
      margin-top: 0.4rem;
      border-top: 1px solid rgba(201, 168, 76, 0.06);
    }
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.7rem;
  border-radius: 50px;
  font-size: 0.75rem;

  background: ${({ $estado }) =>
    $estado === "confirmed"
      ? "rgba(37, 211, 102, 0.12)"
      : "rgba(201, 168, 76, 0.15)"};

  color: ${({ $estado }) =>
    $estado === "confirmed" ? "#25d366" : "var(--gold)"};
`;

export const ButtonSendWa = styled.button`
  background: transparent;
  border: 1px solid rgba(37, 211, 102, 0.4);
  color: #25d366;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: rgba(37, 211, 102, 0.1);
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.55rem;
    font-size: 0.85rem;
  }
`;

export const AdminFooterNote = styled.p`
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-top: 1.5rem;
  text-align: center;
`;
