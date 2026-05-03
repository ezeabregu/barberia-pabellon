import { useState, useEffect } from "react";
import {
  ContainerGeneral,
  NavbarContainer,
  LogoContainer,
  NavLinks,
  ButtonReserve,
  NavLink,
  HamburgerButton,
  OverlayMenu,
} from "./navbarStyles";
import logo from "../../../public/image/logo_barberia_pabellon.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <NavbarContainer>
      <ContainerGeneral>
        <img src={logo} alt="Logo Barbería Pabellón" />
        <LogoContainer>
          Barbería Pabellón<span>Estilo, precisión y elegancia</span>
        </LogoContainer>
      </ContainerGeneral>
      <HamburgerButton onClick={() => setMenuOpen(!menuOpen)} $open={menuOpen}>
        <span />
        <span />
        <span />
      </HamburgerButton>
      <OverlayMenu $open={menuOpen}>
        <NavLinks>
          <li>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/turno" onClick={() => setMenuOpen(false)}>
              Turnos
            </NavLink>
          </li>
          {/* <li>
           onClick="showAdminLogin()"
          <NavLink to="/turno">Admin</NavLink>
        </li> */}
        </NavLinks>
        <ButtonReserve to="/turno" onClick={() => setMenuOpen(false)}>
          Reservar Turno
        </ButtonReserve>
      </OverlayMenu>
    </NavbarContainer>
  );
};

export default Navbar;
