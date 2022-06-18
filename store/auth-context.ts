import { createContext } from "react";

//type 
import { CompanyDetails } from "../types";

type userType = {
   email: string;
   name: string; 
   id: string;
   companyDetails?: CompanyDetails;
}

type authContextPropsType = {
   status: 'loading' | 'authenticated' | 'unauthenticated'; 
   user: null | userType,
   updateUserCompany: (companyDetails: CompanyDetails) => void;
   login: (email: string, password: string) => Promise<{
      error: null | string;
      user: null | userType,
   }>,
   logout: () => void;
}


export const AuthContext = createContext<authContextPropsType>({} as authContextPropsType);
