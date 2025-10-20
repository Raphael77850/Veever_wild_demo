import { FormControl, FormLabel } from "@mui/material";

import { useEffect, useState } from "react";
import { StyledSelect } from "../../../Styles/StyledSelect";
import type { FormInput } from "../../../types/FormInput/FormInput";

type Gender = {
  id: number;
  type: string;
};

export default function InputGender({ handleChange, value }: FormInput) {
  const [genders, setGenders] = useState<Gender[]>([
    { id: 1, type: "Femme" },
    { id: 2, type: "Homme" },
    { id: 3, type: "Autre" },
  ]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/genders`,
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de donnée");
        }
        const data = await response.json();
        // Ajoute les genres récupérés à la liste existante sans doublons
        setGenders((prev) => {
          const existingTypes = prev.map((g) => g.type);
          const newGenders = data.filter(
            (g: Gender) => !existingTypes.includes(g.type),
          );
          return [...prev, ...newGenders];
        });
      } catch (error) {
        console.error("Erreur lors du fetch: ", error);
      }
    };

    fetchGenders();
  }, []);

  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="gender">Votre genre</FormLabel>
      <StyledSelect
        required
        name="gender"
        id="gender"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Veuillez sélectionner</option>
        {genders.map((gender) => (
          <option key={gender.id} value={gender.id}>
            {gender.type}
          </option>
        ))}
      </StyledSelect>
    </FormControl>
  );
}
