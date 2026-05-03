import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { SocialContainer, SocialIcons, SocialIcon } from "./socialMediaStyles";

const SocialLinks = () => {
  return (
    <SocialContainer>
      {/* <SocialText>Seguinos y llevá tu estilo al siguiente nivel</SocialText> */}

      <SocialIcons>
        <SocialIcon
          href="https://instagram.com/barberiapabellon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </SocialIcon>

        <SocialIcon
          href="https://tiktok.com/barberiapabellon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok />
        </SocialIcon>

        <SocialIcon
          href="https://wa.me/5493513931888"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </SocialIcon>
      </SocialIcons>
    </SocialContainer>
  );
};

export default SocialLinks;
