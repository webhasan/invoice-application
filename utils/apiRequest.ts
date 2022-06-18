import axios, {AxiosError} from "axios";

const apiRequest = axios.create({
	baseURL: "http://localhost:3139/",
	headers: { "Content-Type": "application/json", Accept: "application/json" },
});

let interceptor: number | null = null;

export const setAuth = (token: string, logout: () => void) => {

	if(interceptor !== null) {
		apiRequest.interceptors.response.eject(interceptor);
	}

	apiRequest.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	
	interceptor = apiRequest.interceptors.response.use(
		res => res,
		error => {
			if ( error instanceof AxiosError ) {
				if ( error && error.response?.data === "Invalid Token" ) {
					// try {
						// const newToken = refreshToken(refreshTokenId);
						// apiRequest.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
						// set new token everywhere 
						// after refreshing token again send previous request
						// return apiRequest.request(error.config);
					// }catch(e) {
						//logout if token refresh failed
						// logout();
						// return Promise.reject(error);
					// }
					logout();
				}
		   }
			return Promise.reject(error);
		}
	);

};

export const removeAuth = () => {
	delete apiRequest.defaults.headers.common['Authorization'];
	if(interceptor !== null) {
		apiRequest.interceptors.response.eject(interceptor);
	}
};
export default apiRequest;
