import {useState, MouseEvent, useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { AuthContext } from "../../store/auth-context";
import Link from 'next/link';
import NavLink from "./nav-link";
import { ColorModeContext } from "../theme";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from "@mui/material";

const ResponsiveAppBar = () => {
	const { toggleColorMode } = useContext(ColorModeContext);
	const theme = useTheme();

	theme

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
		null
	);
	const { logout, user } = useContext(AuthContext);

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = async () => {
		await logout();
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" data-test='nav-bar'>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Link href="/" passHref>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".1rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Xinvoice
						</Typography>
					</Link>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none"},
							}}
						>
								<NavLink type="MenuItem" href="/">Home</NavLink>
								{!user && <NavLink type="MenuItem" href="/login">Login</NavLink>}
								{!user && <NavLink type="MenuItem" href="/login">Sign Up</NavLink>}
								{user && <NavLink type="MenuItem" href="/clients">Clients</NavLink>}
								{user && <NavLink type="MenuItem" href="/invoices">Invoices</NavLink>}
						</Menu>
					</Box>

					<AdbIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex", justifyContent:"flex-end" },
						}}
					>
						<NavLink type="Button" href="/">Home</NavLink>
						{!user && 
							<>
								<NavLink type="Button" href="/login">Login</NavLink>
								<NavLink type="Button" href="/signup">Sign Up</NavLink>
							</>
						}

						{user && 
							<>
								<NavLink type="Button" href="/clients">Clients</NavLink>
								<NavLink type="Button" href="/invoices">Invoices</NavLink>
							</>
						}
					</Box>
					
					{user && (
						<Box sx={{ flexGrow: 0, marginLeft: 2 }}>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar>{user.name.charAt(0)}</Avatar>
								</IconButton>
							</Tooltip>
							
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<NavLink type="MenuItem" href="/company-details">Company Details</NavLink>
								<NavLink type="MenuItem" onClick={handleLogout} data-test='logout-button'>Logout</NavLink>
								
							</Menu>
						</Box>
					)}

					<IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
						{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
