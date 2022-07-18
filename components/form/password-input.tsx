import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { FieldError } from "react-hook-form";

type PropsTypes = {
   id: string;
   label: string;
   dataTest: string;
   dataErrorTest: string;
   error: FieldError | undefined;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PropsTypes>(
   function PasswordInput(props, ref) {

      const {id, label, dataTest, error, dataErrorTest,...rest} = props;
      const [showPassword, setShowPassword] = useState(false);

      return (
         <TextField
         margin="normal"
         fullWidth
         label={label}
         type={showPassword ? "text" : "password"}
         id={id}
         ref={ref}
         inputProps={{ "data-test": dataTest }}
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton
                     aria-label="toggle password visibility"
                     onClick={() =>
                        setShowPassword(
                           (showPassword) => !showPassword
                        )
                     }
                     edge="end"
                  >
                     {showPassword ? (
                        <VisibilityOff />
                     ) : (
                        <Visibility />
                     )}
                  </IconButton>
               </InputAdornment>
            ),
         }}
         error={!!error}
         helperText={
            error && (
               <span data-test={dataErrorTest}>
                  {error.message}
               </span>
            )
         }
         {...rest }
      />
      )
   }
)

export default PasswordInput;