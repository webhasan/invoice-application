import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
   if(error instanceof AxiosError) {
      if(error?.response?.data) {
         throw error.response.data;
      } else {
         throw error.message;
      }
   }else {
      throw "Something went wrong!"
   }
}