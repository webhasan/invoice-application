import axios, {AxiosError} from "axios";
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const apiRequest = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_REQUEST_URL,
	headers: { "Content-Type": "application/json", Accept: "application/json" },
});

const graphQLRequestURL = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_REQUEST_URL });

 const graphQLRequest = new ApolloClient({
	cache: new InMemoryCache(),
});


let interceptor: number | null = null;

export const setTokenToGraphQLRequest = (graphQLRequest: ApolloClient<NormalizedCacheObject>, token: string) => {
	const authLink = setContext((_, { headers }) => {
		return {
		  headers: {
			 ...headers,
			 authorization: 'Bearer ' + token,
		  }
		}
	 });

	 graphQLRequest.setLink(authLink.concat(graphQLRequestURL));
}


export const setAuth = (token: string, logout: () => void) => {

	if(interceptor !== null) {
		apiRequest.interceptors.response.eject(interceptor);
	}

	apiRequest.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	setTokenToGraphQLRequest(graphQLRequest, token);

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

	graphQLRequest.setLink(graphQLRequestURL);

	if(interceptor !== null) {
		apiRequest.interceptors.response.eject(interceptor);
	}
};
export  {apiRequest, graphQLRequest}
