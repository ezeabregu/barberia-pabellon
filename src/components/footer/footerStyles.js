import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2rem;
  border-top: 1px solid var(--border);
  background: rgba(15, 13, 11, 0.95);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem 1.2rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`;
