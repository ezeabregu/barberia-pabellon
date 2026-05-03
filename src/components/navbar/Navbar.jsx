import {
  ContainerGeneral,
  NavbarContainer,
  LogoContainer,
  NavLinks,
  ButtonReserve,
  NavLink,
} from "./navbarStyles";
import logo from "../../../public/image/logo_barberia_pabellon.jpg";

const Navbar = () => {
  return (
    <NavbarContainer>
      <ContainerGeneral>
        <img src={logo} alt="Logo Barbería Pabellón" />
        <LogoContainer>
          Barbería Pabellón<span>Estilo, precisión y elegancia</span>
        </LogoContainer>
      </ContainerGeneral>
      <NavLinks>
        <li>
          <NavLink to="/" end>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/turno">Turnos</NavLink>
        </li>
        {/* <li>
           onClick="showAdminLogin()"
          <NavLink to="/turno">Admin</NavLink>
        </li> */}
      </NavLinks>
      <ButtonReserve to="/turno">Reservar Turno</ButtonReserve>
    </NavbarContainer>
  );
};

export default Navbar;
