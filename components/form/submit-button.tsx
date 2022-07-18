import LoadingButton from "@mui/lab/LoadingButton";
import { FC } from "react";

type PropsTypes = {
   title: string;
   dataTest: string;
   loading: boolean;
}

const SubmitButton:FC<PropsTypes> = ({title, dataTest, loading}) => {
   return (
      <LoadingButton
         type="submit"
         fullWidth
         variant="contained"
         sx={{ mt: 3, mb: 2 }}
         data-test={dataTest}
         loading={loading}
      >
         {title}
      </LoadingButton>
   )
}

export default SubmitButton;