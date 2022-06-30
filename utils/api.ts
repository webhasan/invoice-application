import {apiRequest, graphQLRequest, setTokenToGraphQLRequest} from "./apiRequest";
import { handleError } from "./handleError";
import { gql } from "@apollo/client";

import type { ClientData, InvoiceWithClientDetails, InvoiceData} from "../types";

type LoginResponseType = {
	email: string;
	name: string;
	token: string;
	user_id: string;
};

type ClientsResponseData = {
	clients: {
		results: {
			id: string;
			user_id: string;
			name: string;
			email: string;
			totalBilled: number;
			invoicesCount: number;
			companyDetails: {
				name: string;
			}
		}[];
		total: number;
	}
};

type InvoiceResponseData = {
	invoices: InvoiceWithClientDetails[];
	total: number;
};

type AddClientProps = {
	email: string,
	name: string,
	companyName: string,
   companyAddress: string,
   vatNumber: string,
   regNumber: string,
   iban: string,
   swift: string,
}

type EditClientProps = AddClientProps & {id: string};


type getClientsPropsType = {
	token?:string | null,    
	limit?: number,
	offset?: number,
	sortBy?: 'ASC' | 'DESC',
	sortOrder?: string,
	filter?: Record<string, any>
}

type getInvoicesPropsType = {
	limit?: number,
	offset?: number,
	sortOrder?: "asc" | "desc",
	sortBy?: string,
	filter?: Record<string, any>
}

export type InvoiceSubmissionType = {
	 invoice_number: string,
	 client_id: string;
	 date: number;
	 dueDate: number,
	 projectCode?: string,
	 meta: {
		 items: {
			 description: string;
			 price: number;
		 }[]
	 },
	value: number;
}

const getInvoices = async ({limit, offset, sortBy, sortOrder, filter}: getInvoicesPropsType = {}) => {
	const queryParams: Record<string, any> = {}
	
	if(limit) {
		queryParams.limit = limit;
  	}

   if(offset) {
		queryParams.offset = offset;
   }
  
  if(sortBy && sortOrder) {
		queryParams.sort = {
			 [sortBy]: sortOrder.toLowerCase()
		}
  }

  if(filter) {
		queryParams.filter = filter;
  }

  const encodeParamsString = encodeURIComponent(JSON.stringify(queryParams));

	try {
		const response = await apiRequest.get<InvoiceResponseData>(`invoices?params=${encodeParamsString}`);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

const getInvoice = async (id: string, token: string) => {
	let headerToken = {}
	if(token) {
		headerToken = { Authorization:  'Bearer ' + token }
	}

	try {
		const { data } = await apiRequest.get<{success: boolean, invoice: InvoiceData}>(`invoices/${id}`, {
			headers:{...headerToken}
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};

const addInvoice = async (data:InvoiceSubmissionType ) => {
	try {
		const response = await apiRequest.post("invoices", data);
		return response.data;
	} catch (error) {
		handleError(error);
	}
}

const editInvoice = async (id: string, data:InvoiceSubmissionType ) => {
	try {
		const response = await apiRequest.put(`invoices/`, {...data, id});
		return response.data;
	} catch (error) {
		handleError(error);
	}
}

const getClients = async ({token, limit, offset, sortBy, sortOrder, filter}: getClientsPropsType = {}) => {

	// const queryParams: Record<string, any> = {}
	
	// let headerToken = {}

	// if(token) {
	// 	headerToken = { Authorization:  'Bearer ' + token }
	// }

	// if(limit) {
	// 	queryParams.limit = limit;
  	// }

   // if(offset) {
	// 	queryParams.offset = offset;
   // }

	// 	if(sortBy && sortOrder) {
	// 		queryParams.sort = {
	// 			 [sortBy]: sortOrder.toLowerCase()
	// 		}
	//   }

	//   if(filter) {
	// 	queryParams.filter = filter;
	//   }


	//const encodeParamsString = encodeURIComponent(JSON.stringify(queryParams));

	let queryParams = '';

	if(limit || (sortBy && sortOrder) || offset) {
		queryParams += "(";

		if(limit) {
			queryParams += `limit: ${limit}`;
		}

		if(sortBy && sortOrder) {
			queryParams += `, sort: {${sortBy} : ${sortOrder.toLocaleLowerCase()}}`;
		}  

		if(offset) {
			queryParams += `, offset: ${offset}`;
		}  

		queryParams += ")";
	}
	queryParams = queryParams.replace(/^, /, '');

   if(token) {
		setTokenToGraphQLRequest(graphQLRequest, token);
	}
	try {
		// const { data } = await apiRequest.get<ClientsResponseData>(`clients?params=${encodeParamsString}`, {
		// 	headers:{...headerToken}
		// });

		const {data} = await graphQLRequest.query<ClientsResponseData>({
		  query: gql`
				query {
					clients${queryParams}{
					total 
					results {
						id
							name
						email
						totalBilled
						invoicesCount
						companyDetails {
							name
							address
						}
					}
					}
				}
		  `,
		  fetchPolicy: 'network-only',
		});

		return data.clients;
	} catch (error) {
		handleError(error);
	}
};

const login = async (email: string, password: string) => {
	try {
		const { data } = await apiRequest.post<LoginResponseType>("login", {
			email,
			password,
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};

const signUp = async (
	name: string,
	email: string,
	password: string,
	confirmPassword: string
) => {
	try {
		const { data } = await apiRequest.post<{ user_id: string }>(
			"register",
			{
				name,
				email,
				password,
				confirmPassword,
			}
		);
		return data;
	} catch (error) {
		handleError(error);
	}
};

const getUser = async () => {
	try {
		const { data } = await apiRequest.get<{ user_id: string }>("me");
		return data;
	} catch (error) {
		handleError(error);
	}
};

const getUserByToken = async (token: string) => {
	try {
		const { data } = await apiRequest.get("me", {
			headers: {
				"x-access-token": token,
			},
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};

const updateCompany = async (
	name: string,
	address: string,
	vatNumber: string,
	regNumber: string,
	iban?: string,
	swift?: string
) => {
	try {
		const { data } = await apiRequest.put("/me/company", {
			name, address, vatNumber, regNumber, iban, swift
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};

const addClient = async (clientProps: AddClientProps) => {
	const clientInfo = {
		name: clientProps.name, 
		email: clientProps.email, 
		companyDetails: {
			name: clientProps.companyName, 
			address: clientProps.companyAddress,
			vatNumber: clientProps.vatNumber, 
			regNumber: clientProps.regNumber,
			iban: clientProps.iban,
			swift: clientProps.iban
		}
	}

	try {
		const { data } = await apiRequest.post("/clients", clientInfo);
		return data;
	} catch (error) {
		handleError(error);
	}
}

const editClient = async(clientProps: EditClientProps) => {

	const clientInfo = {
		id: clientProps.id,
		name: clientProps.name, 
		email: clientProps.email, 
		companyDetails: {
			name: clientProps.companyName, 
			address: clientProps.companyAddress,
			vatNumber: clientProps.vatNumber, 
			regNumber: clientProps.regNumber,
			iban: clientProps.iban,
			swift: clientProps.iban
		}
	}

	try {
		const { data } = await apiRequest.put("/clients", clientInfo);
		return data;
	} catch (error) {
		handleError(error);
	}
}

const getClient = async(id: string, token?:string) => {
	let headerToken = {}
	if(token) {
		headerToken = { Authorization:  'Bearer ' + token }
	}
	try {
		const { data } = await apiRequest.get<{success: boolean, client: ClientData}>(`/clients/${id}`, {
			headers: {...headerToken}
		});
		return data;
	} catch (error) {
		handleError(error);
	}
}

const getClientIdByCompany = async(companyName: string ) => {
	let clientId: string  = '0';
	const clientsResponse = await api.getClients();

	if(clientsResponse && clientsResponse.results) {
		const client = clientsResponse.results.find(client => client.companyDetails.name === companyName);
		if(client) {
			clientId = client.id;
		}
	}
	return clientId;
}

const getClientIdByClientName = async(clientName: string ) => {
	let clientId: string  = '0';
	const clientsResponse = await api.getClients();

	if(clientsResponse && clientsResponse.results) {
		const client = clientsResponse.results.find(client => client.name === clientName);
		if(client) {
			clientId = client.id;
		}
	}
	return clientId;
}

export const api = {
	getInvoices,
	addInvoice,
	getInvoice,
	editInvoice,
	getClients,
	addClient,
	editClient,
	login,
	signUp,
	getUser,
	getClient,
	getUserByToken,
	updateCompany,
	getClientIdByCompany,
	getClientIdByClientName
};
