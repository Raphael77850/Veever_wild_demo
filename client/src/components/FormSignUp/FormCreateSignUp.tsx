import "./Form.css";
import "react-datepicker/dist/react-datepicker.css";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../Styles/StyledButton";
import useFormData from "../../services/Form/FormData";
import useFormValidation from "../../services/Form/FormValidation";
import HeaderForm from "./HeaderForm";
import InputCheckCGU from "./InputForm/InputCheckCGU";
import InputCheckContact from "./InputForm/InputCheckContact";
import InputDate from "./InputForm/InputDate";
import InputEmail from "./InputForm/InputEmail";
import InputFirstName from "./InputForm/InputFirstName";
import InputGender from "./InputForm/InputGender";
import InputLastName from "./InputForm/InputLastName";
import InputPassword from "./InputForm/InputPassword";
import InputPhone from "./InputForm/InputPhone";
import InputUsername from "./InputForm/InputUsername";

export default function FormCreateSignUp() {
  const {
    email,
    password,
    errors,
    confirmPassword,
    isSamePassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailCheckChange,
  } = useFormValidation();
  const { handleChange, formData } = useFormData();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0 || !isSamePassword) {
      setShowSnackbar(true);
      return;
    }

    // Validation des champs obligatoires
    if (!formData.nickname || !formData.lastname || !formData.firstname) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!formData.gender_id || formData.gender_id === 0) {
      alert("Veuillez sélectionner votre genre");
      return;
    }

    if (!formData.birthdate) {
      alert("Veuillez sélectionner votre date de naissance");
      return;
    }

    try {
      // Préparer les données avec les bons types
      const clientData = {
        nickname: formData.nickname.trim(),
        lastname: formData.lastname.trim(),
        firstname: formData.firstname.trim(),
        email: email.trim(),
        password,
        gender_id: Number(formData.gender_id),
        birthdate: formData.birthdate,
        phoneNumber: formData.phoneNumber?.trim() || undefined,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clientData),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur serveur:", errorText);
        throw new Error(`Erreur ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.info("Compte créé avec succès:", data);
      navigate("/login");
    } catch (error) {
      console.error("Erreur réseau:", error);
      // Afficher un message d'erreur à l'utilisateur
      alert("Erreur lors de la création du compte. Vérifiez les informations.");
    }
  };

  return (
    <>
      <HeaderForm />
      <form onSubmit={handleSubmit} className="createForm">
        <InputUsername
          handleChange={handleChange("nickname")}
          value={formData.nickname}
        />
        <InputLastName
          handleChange={handleChange("lastname")}
          value={formData.lastname}
        />
        <InputFirstName
          handleChange={handleChange("firstname")}
          value={formData.firstname}
        />
        <InputEmail
          handleEmailCheckChange={handleEmailCheckChange}
          email={email}
          errors={errors}
        />
        <InputPassword
          password={password}
          confirmPassword={confirmPassword}
          errors={errors}
          isSamePassword={isSamePassword}
          handlePasswordChange={handlePasswordChange}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
        />
        <InputGender
          handleChange={handleChange("gender_id")}
          value={formData.gender_id}
        />
        <InputDate
          handleChange={handleChange("birthdate")}
          value={formData.birthdate}
        />
        <InputPhone
          handleChange={handleChange("phoneNumber")}
          value={formData.phoneNumber}
        />
        <InputCheckContact
          handleChange={handleChange("checkContact")}
          value={formData.checkContact}
        />

        <InputCheckCGU
          handleChange={handleChange("checkCGU")}
          value={formData.checkCGU}
        />
        <StyledButton
          className="btnAcceptForm"
          type="submit"
          variant="contained"
        >
          Crée mon compte
        </StyledButton>

        {showSnackbar && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            onClose={handleClose}
            transitionDuration={700}
          />
        )}
      </form>
    </>
  );
}
