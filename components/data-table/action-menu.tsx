import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import React from 'react';

type propsType = {
   dataTest?: string;
   menuItems: {title: string; url: string; 'date-test'?: string;}[]
}
const ActionMenu: React.FC<propsType> = ({menuItems, dataTest}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
            data-test={dataTest}
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
            {menuItems.map((item) => {
					const {url, title, ...rest} = item;
					return (
						<MenuItem key={url} {...rest}>
							<Link href={url}>{title}</Link>
						</MenuItem>
					)
            })}
			</Menu>
		</div>
	);
};

export default ActionMenu;