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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AuthContext } from "../../store/auth-context";
import Link from 'next/link';

const ResponsiveAppBar = () => {
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
		<AppBar position="static">
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
								display: { xs: "block", md: "none" },
							}}
						>
								<MenuItem>
									<Typography textAlign="center">
										<Link href="/">
											Home
										</Link>
									</Typography>

									{!user &&
										<>
											<Typography textAlign="center">
												<Link href="/login">
													Login
												</Link>
											</Typography>
											<Typography textAlign="center">
												<Link href="/sign-up">
													Sign Up
												</Link>
											</Typography>
										</>
									}

									{user &&
										<>
											<Typography textAlign="center">
												<Link href="/clients">
													Clients
												</Link>
											</Typography>
											<Typography textAlign="center">
												<Link href="/invoices">
													Invoices
												</Link>
											</Typography>
										</>
									}
								</MenuItem>
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

						<Button sx={{ my: 2, color: "white", display: "block" }}>
							<Link href="/">
								Home
							</Link>
						</Button>

						{!user && 
							<>
								<Button sx={{ my: 2, color: "white", display: "block" }}>
									<Link href="/login">
										Login
									</Link>
								</Button>

								<Button sx={{ my: 2, color: "white", display: "block" }}>
									<Link href="/sign-up">
										Signup
									</Link>
								</Button>
							</>
						}

						{user && 
							<>
								<Button sx={{ my: 2, color: "white", display: "block" }}>
									<Link href="/clients">
										Clients
									</Link>
								</Button>

								<Button sx={{ my: 2, color: "white", display: "block" }}>
									<Link href="/invoices">
										Invoices
									</Link>
								</Button>
							</>
						}
					</Box>
					
					{user && (
						<Box sx={{ flexGrow: 0 }}>
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
								<Link href="/company-details">
									<MenuItem>
										<Typography textAlign="center">
											Company Details
										</Typography>
									</MenuItem>
								</Link>

								<MenuItem onClick={handleLogout}>
									<Typography textAlign="center">
										Logout
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
