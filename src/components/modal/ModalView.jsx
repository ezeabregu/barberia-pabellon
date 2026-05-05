import { Overlay, Container, Message, Button } from "./modalViewStyles";

const ModalView = ({ texto, onClose }) => (
  <Overlay onClick={onClose}>
    <Container onClick={(e) => e.stopPropagation()}>
      <Message>{texto}</Message>
      <Button onClick={onClose}>Aceptar</Button>
    </Container>
  </Overlay>
);

export default ModalView;
