import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import ExternalSystemLogin from "./ExternalSystemLogin";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <article className="signUp">
      <h2>{"Je m'inscris".toLocaleUpperCase()}</h2>
      <p>Inscrivez-vous pour accéder à Veever</p>
      <ExternalSystemLogin />
      <button
        type="button"
        className="loginCTA"
        onClick={() => {
          navigate("/signup");
        }}
      >
        {"Inscription".toLocaleUpperCase()}
      </button>
    </article>
  );
}
