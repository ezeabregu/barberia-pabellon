import styled from "styled-components";
import { NavLink as RouterNavLink, Link } from "react-router-dom";

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2rem;
  border-bottom: 1px solid var(--border);
  background: rgba(15, 13, 11, 0.95);
  backdrop-filter: blur(10px);
  position: relative;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ContainerGeneral = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    width: 38px;
    margin-right: 10px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    img {
      width: 32px;
    }
  }
`;

export const LogoContainer = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 1.4rem;
  color: var(--gold);
  letter-spacing: 2px;
  text-transform: uppercase;

  span {
    display: block;
    font-size: 0.65rem;
    font-family: "DM Sans", sans-serif;
    color: var(--text-muted);
    letter-spacing: 4px;
    font-weight: 300;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    font-size: 1rem;

    span {
      font-size: 0.55rem;
      letter-spacing: 2px;
    }
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  list-style: none;
  text-align: center;

  li {
    list-style: none;
  }
`;

export const ButtonReserve = styled(Link)`
  background: var(--gold);
  color: var(--dark);
  padding: 0.55rem 1.4rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;

  &:hover {
    background: var(--gold-light);
  }

  @media (max-width: 768px) {
    padding: 0.45rem 1rem;
    font-size: 0.7rem;
  }
`;

export const NavLink = styled(RouterNavLink)`
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.2s;
  cursor: pointer;

  &:hover,
  &.active {
    color: var(--gold);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 300;

  span {
    width: 28px;
    height: 2px;
    background: var(--gold);
    transition: all 0.3s ease;
  }

  ${({ $open }) =>
    $open &&
    `
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  `}

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const OverlayMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(15, 13, 11, 0.98);
  backdrop-filter: blur(12px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  transform: ${({ $open }) => ($open ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ $open }) => ($open ? "1" : "0")};

  transition: all 0.4s ease;
  z-index: 200;

  @media (min-width: 769px) {
    display: none;
  }
`;
