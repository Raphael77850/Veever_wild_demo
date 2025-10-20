import { FormControl, FormLabel } from "@mui/material";
import { fr } from "date-fns/locale/fr";
import { StyledDatePicker } from "../../../Styles/StyledDatePickers";
import type { FormInput } from "../../../types/FormInput/FormInput";

export default function InputDate({ handleChange, value }: FormInput) {
  // Calculer une date par défaut : il y a 18 ans
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 18);

  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="birthday">Votre date de naissance</FormLabel>
      <StyledDatePicker
        id="birthday"
        required
        className="birthdayCalendar"
        locale={fr}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        showIcon
        toggleCalendarOnIconClick
        selected={value ? new Date(value) : defaultDate}
        onChange={(date: Date | null) =>
          handleChange(date ? date.toISOString().split("T")[0] : "")
        }
      />
    </FormControl>
  );
}
