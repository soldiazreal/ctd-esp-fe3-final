import { Box, IconButton, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface ControlledTextInputProps {
  name: string;
  label: string;
  defaultValue?: string;
  maxLength?: number;
  regex?: RegExp;
  type?: "text" | "password" | "number" | "tel" | string;
}

const ControlledTextInput: FC<ControlledTextInputProps> = ({
  name,
  label,
  defaultValue = "",
  maxLength = 255,
  regex,
  type = "text",
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const {
    field: { onChange, value, ref },
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const inputValue = (value: any) => {
    if (regex) {
      return value.match(regex) ? value : "";
    }
    return value;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      mb={2}
      sx={{
        position: "relative",
        paddingY: "5px",
      }}
    >
      <TextField
        onChange={onChange}
        value={inputValue(value)}
        label={label}
        name={name}
        inputRef={ref}
        type={showPassword ? "text" : type}
        inputProps={{ maxLength }}
        fullWidth
        error={!!errors[name]}
        helperText={`${errors[name]?.message || ""}`}
      />
      {type === "password" && (
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          sx={{
            position: "absolute",
            right: "8px",
            top: "10px",
          }}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      )}
    </Box>
  );
};

export default ControlledTextInput;
