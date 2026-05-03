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
  position: sticky;
  top: 0;
  z-index: 100;
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
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  list-style: none;
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
`;
