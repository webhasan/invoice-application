# Invoice Creation Application for Company and Freelancer #

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
