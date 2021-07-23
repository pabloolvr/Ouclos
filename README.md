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

The website was developed using React, NodeJS and Redux, used to manage the application states. MongoDB was used for the backend.

### Navigation Diagram
![NavigationDiagram](https://user-images.githubusercontent.com/48020553/126726170-3f1b2ef5-7a46-4ff0-9951-47b662b73da8.jpg)
## Source comments
The source code of the project is consisted of two parts, frontend and backend.
### Frontend

The frontend part contains all files related to the visual part of the system. It has a global ```index.css``` file, responsible for all the website styling and a ```store.css``` file, which is the redux store, responsible to hold the current application state inside of it. Inside the frontend part there are two directories, ```public```, which basically stores images used in the application and ```src```, which stores all the source code of the application, divided into the following directories:
 - ```src/actions```: stores methods responsible to execute events in the application, like making requests to the server, from different entities of the system.
 - ```src/components```: stores source code of reusable components used in the site, like the product card.
 - ```src/pages```: stores the pages of the website.
 - ```src/reducers```: stores functions that change the states of the application based on actions performed, each reducer is directly used in the redux store.
 - ```src/constants```: defines what type of actions can be performed for each reducer.
 
### Backend

The backend part contains all files related to the data management part of the system. It have ```index.js```, responsible to run the server, ```utils.js```, responsible to implement authentication methods and ```data.js```, which stores predefined data to send to the database. The backend part has two directories:
 - ```models```: stores the data models of entities of the database, e.g., the data fields of entities like product and user.
 - ```routers```: stores server routes to different http requests of entities of the system.

## Test plan

The backend tests were made using Postman and browser. 

### Backend

#### /api/users

 - GET /  
 Retorna a listagem de usuários;

 - GET /
 Get data of all users from database. It requires user and admin authentication and if one of these two is not validated, a 401 error is returned.

 - get /:id
 Get data of a user with a given id. It returns a 404 error if id is not found in the database.
 - delete /:id
 Delete an user with a given id. It requires user and admin authentication and if one of these two is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database. It returns a 400 error if the admin that comes with the application is being removed.
 - put /:id
 Makes a common user with a given id an admin. Requires user and admin authentication, if one of these two is not validated, a 401 error is returned.
 - put /profile
 Update information of a user. Requires user authentication and if it is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.
 - post /register
 Register an user into the database.
 - post /login
 Log in an user into the system. It returns a 401 error if email or password is incorrectly inserted.
 - get /seed
 Get data of pre-defined users. 


#### /product

#### /order

### Frontend

- **Register**

- **Login**

- **Edit Profile and Address**

- **Acces Orders**

- **User Management**

- **Product Management**

- **Order Management**

- **Cart**

## Test results

All the tests mentioned before worked as expected.

## Execution procedure

### 1. Download or Clone repo

```
$ git@github.com:pabloolvr/ProjectDevWeb.git
```

### 2. Install NodeJs and NPM

 - Install NodeJS and NPM from https://nodejs.org/en/download/.

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

- Run this on chrome: http://localhost:5000/api/users/seed
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products
- It creates 10 sample products

### 7. Admin Login

- admin user: admin@example.com
- admin password: admin
 
## Issues
 None
