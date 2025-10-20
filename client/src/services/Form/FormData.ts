import { useState } from "react";
import type { FormData } from "../../types/FormData/FormData";

export default function useFormData() {
  // Initialiser avec la date d'aujourd'hui par défaut
  const today = new Date();
  const defaultBirthdate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  const [formData, setFormData] = useState<FormData>({
    nickname: "",
    lastname: "",
    firstname: "",
    gender_id: 0,
    birthdate: defaultBirthdate, // Date par défaut : il y a 18 ans
    phoneNumber: "",
    checkContact: "",
    checkCGU: "",
  });
  const handleChange = (name: string) => (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return { handleChange, formData };
}
