import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 13, 11, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const Container = styled.div`
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border-top: 2px solid var(--gold);
  animation: ${slideUp} 0.25s ease-out;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
`;

export const Message = styled.p`
  font-family: "Playfair Display", serif;
  color: var(--text);
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0 0 1.8rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const Button = styled.button`
  background: var(--gold);
  color: var(--dark);
  padding: 0.8rem 2.2rem;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;

  &:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem;
    font-size: 0.8rem;
  }
`;
