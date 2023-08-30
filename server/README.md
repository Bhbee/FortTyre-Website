# 📜 Basic Overview

This part of the project is the API for an E-comerce website `Drawer Navigation`


# 🛠 Tech Details

This project was built primarily with `Nodejs(Expressjs)`, `Typescript`, `MongoDB` (stack, drawer and bottom tabs), and `Passport`

Other tools used for maintaining a standard project workflow and structure include `eslint` for linking and `prettier` for code formatting and `npm` for package management.
Other Third party API include `Cloudinary`, `Paystack` and `Passport` for google Oauth.

## ⚙️ Setting up & Running the Project

- After cloning the project, change directory to the folder
- Install all the js dependencies using `$ npm install`. 


```
💡 You will need an .env file. Create one with the following keys. But add your own correct values:
origin = "add your value" //the value shpuld contain the website(frontend url that will be making calls to the api)
baseUrl = "https://forttyreapi.onrender.com"
PORT = 3000
MONGO_URL = "add your value"
ACCESS_TOKEN_EXPIRES_IN = "add your value"
REFRESH_TOKEN_EXPIRES_IN = "add your value"

//create a google APIS acount
googleClientId = "add your value"
googleClientSecret = "add your value"
googleOauthRedirectUrl = "add your value"

cookieSessionKey = "add your value"

//create a nodemailer account 
nodemailerMail = "add your value"
nodemailerPass = "add your value"

 //Create a cloudinary account
CLOUDINARY_CLOUD_NAME = add your value
CLOUDINARY_API_KEY = add your value
CLOUDINARY_API_SECRET = add your value

//create a paystack dev account
PAYSTACK_SECRET_KEY = add your value
PAYSTACK_BASE_URL = add your value
PUBLIC_KEY = "add your value"


JWT_SECRET= "add your value"
```
- Now you can run the server`npm start`

### Available Scripts

In the project directory, you can run

#### npm start

To start the server and connect to database

#### npm build

To build the typescript files into javascript files

## 🧱 Project Structure

### The top level directory structure is as follows:
- [config](src%2F%40config) - Contains Interfaces, enum, types, declarations
- [controllers](src%2Fcontrollers) - Contains globally shared/reusable components, 
- [middlewares](src%2F%40types) - Contains Interfaces, enum, types, declarations
- [models](src%2Fmodels) - Contains globally shared/reusable components, such as 
- [routers](src%2Fcontrollers) - Contains globally shared/reusable components, 
- [types](src%2F%40types) - Contains Interfaces, enum, types, declarations

- [utilities](src%2Futilities) - Contains utilities [functions], helpers, and the likes
- [services](src%2Fservices) - Would contain the API related services for the app

# ⚡️ Walkthrough of the API

- As previously mentioned in the previous sections of this README, I made use of react-navigation's Drawer, Stack and Tab navigations to achieve the required navigations of the app.

### Accesible endpoints for users:

- Register New User: POST /auth/sign-up
- User Login: POST /auth/sign-in
- User Logout: DELETE /auth/sign-out
- Refresh token: GET /auth/refresh
- Google Oauth: GET /auth/google
- Forgot password: POST /auth/forgot-password
- Reset password: POST /auth/reset-password
- View my profile: GET /users/profile/:id
- Update my profile: PATCH /users/:id

- Get all products: GET /products/
- Search for product by filter: GET /products/search
- Get a particular product: GET /products/:id
- 

- Place Order: POST /orders/
- Get my order history: GET /orders/
- Get order details: GET /orders/:id
- Make payments: POST /orders/:id/pay

### Accesible endpoints for Admins only:
- Get all registered users: GET /users/
- Delete user account: DELETE /users/:id
- View user's profile: GET /users/:id

- Add a new product to database: POST /products/
- Edit product details: PATCH /products/:id
- Delete product from database: DELETE /products/:id

- Get all Orders: GET /orders/
- Get summary of monthly sales: GET /orders/summary
- Delete order: DELETE /orders/:id
- Update delivery status: PUT /orders/:id/deliver

## API Documentation

![API Documentation](https://documenter.getpostman.com/view/22756934/2s946h8Xeg#268c9d99-5c21-49eb-9b8c-559b2c932829).

```Users can create their own account with the following details:
- First name
- Last name
- Email address
- Phone number
- Password (This password will be encrypted using bcrypt before been added to the database.)
```
```
User Login
User provides the following details for a successful login:
- Email address
- Password.

```
# ⚡️ For authentication, JWT is used. For validation, JOI is used.	