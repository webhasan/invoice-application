# Invoice Applicatoin #

It's an application to generate invoices for companies and individuals. It includes clients and invoices management. It provides sort and filtering options to quickly filter invoices with any pramitest of invoices and clients.  It's based on **Next.JS,**  the MUI library. It's a highly tested-application with unite testing and end-to-end testing with Cypress. 

## Configuration: ##
The app backend is used this [https://github.com/vladnicula/invoice-rest-api](https://github.com/vladnicula/invoice-rest-api) project REST API. 
The default `rest api` end-point is `http://localhost:3139`  and `GraphQL` end point`http://localhost:3139` is for `GraphQL` request. If you need you can change it from `.env` file in the project root folder. 

Before run the app you need to install all required dependency using `npm i`

To run app as dev mood use command `npm run dev` or product `npm run build` and `npm start`

## Test ##
There are 2 test case available. 
**jest test:** `npm run test`
**E2E cypress test:** `npm run cypress`


## Packages/Libraries ##
* Next JS
* TypeScript
* Axios 
* Apollo Client (For `app.getClients` using graphql)
* React Hook Form 
* useAsync (For sending `get` request )
* Yup
* Cookies Next
* MUI 
* Material React Toastify
