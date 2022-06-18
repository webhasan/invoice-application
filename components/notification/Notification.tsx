import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type propsType = {
	message: string;
	type: "success" | "error";
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Notification: React.FC<propsType> = ({ message, type }) => {
	const [open, setOpen] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
			<Alert severity={type} sx={{ width: "100%" }} onClose={handleClose}>
				{message}
			</Alert>
		</Snackbar>
	);
};
