# DevWebProject

Web Project for SCC0219

## Requirements
 - The system have 2 types of users: Customers and Administrators. The application already comes with an admin account with password admin.

 - Administrators are responsible for registering/managing by turning an non administrator user into an administrator.

 - Administrators responsible for manage products, e.g., they can create, update, read and delete products.

 - Administrators are also responsible to manage orders, they can read, set as delivered and delete orders.

 - Customers are non administrator users that access the system to buy products.

 - The admin's and customer's records include: name, surname, cpf, birthdate, phone, email and address.

 - Product's records include: id, name, photo, quantity in stock, category, gender, style, lens material, frame material, lens color, frame color, lens protection and description.

 - Products are selected, their quantity chosen, and are included in a cart. Carts are emptied only on payment or by customers.

 - To buy a product, the user first need to insert an address with their respective information: public place, public place number, neighbourhood, city, state and postal code. If the user already has a registered address, the fields are automatically filled. After inserting the addres, the user must choose de payment method, between credit card and debit card, and insert the following information: credit card number (any number is accepted by the system), card validation date, card security code and cpf of the owner of the card. After inserting the address and the credit card information, the user place the order and the quantity of products sold is subtracted from the quantity in stock and added to the quantity sold. 

 - The system has a rating system in which the logged in users can give a rating, which ranges from 1 to 5 stars, to each product.

 - The system must provide accessibility requirements and provide good usability. The system must be responsive.

## Project Description
### Navigation Diagram
The website was developed using React, NodeJS and Redux, used to manage the application states. MongoDB was used for the backend.
![NavigationDiagram](https://user-images.githubusercontent.com/48020553/126726170-3f1b2ef5-7a46-4ff0-9951-47b662b73da8.jpg)
## Source comments
The source code of the project is consisted of two parts, frontend and backend.
### Frontend
The frontend part contains all files related to the visual part of the system. It has a global ```index.css``` file, responsible for all the website styling and a ```store.css``` file, which is the redux store, responsible to hold the current application state inside of it. Inside the frontend part there are two directories, ```public```, which basically stores images used in the application and ```src```, which stores all the source code of the application, divided into the following directories:
 - 
### Backend

## Test plan
## Test results
## Execution procedure

 - Download or clone the project source code.
 - Install all required npm packages by running 'npm install' from the command line in the project root folder 'loja-oculos' (where the package.json is located).
 - Start the application by running 'npm run start' from the command line in the project root folder .
 - Your browser should automatically open at http://localhost:3000

### 1. Install NodeJs and NPM

 - Install NodeJS and NPM from https://nodejs.org/en/download/.

### 2. Download or Clone repo

```
$ git@github.com:pabloolvr/ProjectDevWeb.git
```

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/ouclos
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb+srv://your-db-connection

### 4. Run Backend

```
$ cd ProjectDevWeb
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 6. Seed Users and Products

- Run this on chrome: http://localhost:5000/api/users
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products
- It creates 10 sample products

### 7. Admin Login

- admin user: admin@example.com
- admin password: admin
 
## Issues
 Comments
