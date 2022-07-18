import TextField from "@mui/material/TextField";
import React from "react";
import { FieldError } from "react-hook-form";

type PropsTypes = {
   id: string;
   label: string;
   dataTest: string;
   dataErrorTest: string;
   error: FieldError | undefined;
   type?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, PropsTypes>(
   function TextInput(props, ref) {
      
      let {id, label, dataTest, error, dataErrorTest, type,...rest} = props;
      type = type || 'text';

      let inputLabelProps = {}

      if(type === 'date') {
         inputLabelProps = {
            InputLabelProps: {
               shrink: true,
            }
         }
      }


      return (
         <TextField
            margin="normal"
            fullWidth
            id={id}
            type={type}
            label={label}
            inputProps={{ "data-test": dataTest }}
            error={!!error}
            ref={ref}
            helperText={
               error && (
                  <span data-test={dataErrorTest}>
                     {error.message}
                  </span>
               )
            }
            {...inputLabelProps}
            {...rest}
         />
      )
});

export default TextInput;