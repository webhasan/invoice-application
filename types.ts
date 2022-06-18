export type InvoiceData = {
   id: string
   invoice_number: string
   user_id: string
   client_id: string
   date: number
   dueDate: number
   value: number
   projectCode: string
   meta?: Record<string, any>
};

export type CompanyDetails = {
   name: string
   address: string
   vatNumber: string
   regNumber: string
   iban?: string
   swift?: string
}


export type ClientData = {
   id: string
   user_id: string
   email: string
   name: string
   totalBilled: number
   invoicesCount: number
   companyDetails: CompanyDetails
};


export type InvoiceWithClientDetails = {
   invoice: Omit<InvoiceData, "invoicesCount" | "companyDetails">
   client: ClientData
}