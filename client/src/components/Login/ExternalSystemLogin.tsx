import google from "../../assets/images/google.svg";
import meta from "../../assets/images/meta-icon.svg";
import "./ExternalSystemLogin.css";

export default function ExternalSystemLogin() {
  return (
    <ul className="socialLogin">
      <li>
        <button type="button">
          <img src={google} alt="Google" />
        </button>
      </li>
      <li>
        <button type="button">
          <img src={meta} alt="Meta" />
        </button>
      </li>
    </ul>
  );
}
