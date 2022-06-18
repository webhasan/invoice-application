export const ucFirst = (str:string) =>  {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (timeStamp: number): string =>  {   
   return new Date(timeStamp).toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
   });
}
