import { AuthContext } from "./auth-context";
import { api } from "../utils/api";
import { FC, ReactNode, useState, useEffect } from "react";
import { removeAuth, setAuth } from "../utils/apiRequest";
import { setCookies, getCookie, removeCookies } from "cookies-next";

// type
import { CompanyDetails } from "../types";

type propsType = {
	children: ReactNode;
};

type userType = {
	email: string;
	name: string;
	id: string;
   companyDetails?: CompanyDetails
};

type statusType = "loading" | "authenticated" | "unauthenticated";

const AuthContextProvider: FC<propsType> = ({ children }) => {
	const [status, setStatus] = useState<statusType>("loading");
	const [user, setUser] = useState<userType | null>(null);
	const [loadingApp, setLoadingApp] = useState(true);

	useEffect(() => {
		(async () => {
			if (loadingApp) {
				const cookie = getCookie("auth");
				if (cookie && typeof cookie === "string") {
					const response = JSON.parse(cookie);
					try {
						const userDetails = await api.getUserByToken(response.token);
                  const companyDetails = userDetails.companyDetails ?? null;

						let userInfo = {
							name: response.name,
							email: response.email,
							id: response.user_id,
                     companyDetails: companyDetails
						};

                  setAuth(response.token, logout);
						setUser(userInfo);
						setStatus("authenticated");
					} catch (e) {
                  if(e === 'Invalid Token') {
                     removeCookies('auth');
                     setStatus("unauthenticated");
                  }
					}
				} else {
					setStatus("unauthenticated");
				}

				setLoadingApp(false);
			}
		})();
	}, [loadingApp]);

	const login = async (email: string, password: string) => {
		const loginResponse: { error: string | null; user: userType | null } = {
			error: null,
			user: null,
		};

		try {
			const response = await api.login(email, password);
			if (response) {
				setCookies("auth", response);
				
            const userDetails = await api.getUserByToken(response.token);
				
				let userInfo = {
					name: response.name,
					email: response.email,
					id: response.user_id,  
               companyDetails: userDetails.companyDetails ?? null    
				};
				setAuth(response.token, logout);
				setUser(userInfo);
				setStatus("authenticated");
				loginResponse.user = userInfo;
			}
		} catch (error) {
			setStatus("unauthenticated");
			loginResponse.error = error as string;
		}
		return loginResponse;
	};

	const logout = () => {
		removeAuth();
		removeCookies("auth");
		setStatus("unauthenticated");
		setUser(null);
	};

	const updateUserCompany = (company: CompanyDetails) => {
		setUser(user => {
			if(user) {
				return {...user, companyDetails: company}
			}
			return user;
		})
	}

	const value = {
		status,
		user,
		login,
		logout,
		updateUserCompany,
	};

	if (loadingApp) {
		return null;
	}

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;
