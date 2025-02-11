import logo from "../../assets/images/LogoVeever.png";
import LoginForm from "../../components/Login/LoginForm";
import PasswordForgotten from "../../components/Login/PasswordForgotten";
import SignUp from "../../components/Login/SignUp";
import "./Login.css";

export default function Login() {
  return (
    <main className="loginMain">
      <img className="loginLogo" src={logo} alt="Veever logo" />
      <LoginForm />
      <PasswordForgotten />
      <p>ou</p>
      <SignUp />
    </main>
  );
}
