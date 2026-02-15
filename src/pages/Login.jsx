import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import DarkModeToggle from "../ui/DarkModeToggle";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
const DarkModeContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 9999;
`;

function Login() {
  return (
    <>
      <DarkModeContainer>
        <DarkModeToggle />
      </DarkModeContainer>
      <LoginLayout>
        <Logo />
        <Heading as="h4">Log in to your account</Heading>
        <LoginForm />
      </LoginLayout>
    </>
  );
}

export default Login;
