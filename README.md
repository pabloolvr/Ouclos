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

 - get ```/```  
 Get data of all users from database. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned.

 - get ```/:id```  
 Get data of a user with a given id. It returns a 404 error if id is not found in the database.

 - delete ```/:id```  
 Delete an user with a given id. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database. It returns a 400 error if the admin that comes with the application is being removed.

 - put ```/:id```  
 Makes a common user with a given id an admin. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.

 - put ```/profile```  
 Update information of a user. It requires user authentication, if it is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.

 - post ```/register```  
 Register an user into the database.

 - post ```/login```  
 Log in an user into the system. It returns a 401 error if email or password is incorrectly inserted.

 - get ```/seed```  
 Get data of pre-defined users stored in ```data.js```. 

#### /product

 - get ```/```  
 Get data of product from database based on a filter in req.

 - get ```/categories```  
 Get all possible product categories from database.

  - get ```/genders```  
 Get all possible product genders from database.

  - get ```/styles```  
 Get all possible product styles from database.

  - get ```/lensmaterials```  
 Get all possible product lens materials from database.

  - get ```/framecolors```  
 Get all possible product frame colors from database.

  - get ```/lenscolors```  
 Get all possible product lens colors from database.

 - get ```/seed```  
 Get data of pre-defined products stored in ```data.js```. 

 - post ```/```  
 Insert a new produt into the database. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned.

 - get ```/:id```  
 Get information of product with a given id. It returns a 404 error if id is not found in the database.

 - put ```/:id```  
 Update information of product with a given id. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.

 - delete ```/:id```  
 Delete a product with a given id. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.

 - post ```/:id/reviews```  
 Post a review of a product with a given id. It requires user authentication, if it is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.

#### /order

 - get ```/```  
 Get data of all orders from database. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned.

 - get ```/mine```  
 Find orders of an authenticated user. As it requires user authentication, a 401 error is returned if it is not validated.

 - post ```/```  
 Create an order, storing it in the database. It requires user authentication, if it is not validated, a 401 error is returned. If the cart is empty, a 400 error is returned. 

 - get ```/:id```  
 Get information of an order with a given id. It requires user authentication, if it is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.

 - delete ```/:id```  
 Delete an order with a given id. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.

 - put ```/:id/deliver```  
 Set an order with a given id as delivered. It requires user and admin authentication, if at least one of these two is not validated, a 401 error is returned. It returns a 404 error if id is not found in the database.

### Frontend

- **Register:** The user must fill all the mandatory fields regarding to Personal Data, except phone. CPF and Email must be inserted in the correct formats otherwise there will be an error box informing to use the correct format. The fields regarding to Address are optional

- **Login:** To access the login page, the user must click in the 'acessar conta' button. Once there, the user must insert email and password correctly and a validation is done using info in the database. An error box informing that email or password are invalid should appear if they don't match the information in the database. If email and password match, the user is redirected to the home page and the button 'acessar conta' becomes 'olá, (User Name)'.

- **Search Products:** The user can access the search page by clicking in one of the category product buttons in the header navigation bar or inserting a name in the search bar and pressing enter. Once there, the user must be able to filter by product caracteristics and sort by date, price and rating all the products that match the category or name, depending on how the page was accessed.

- **Cart:** The user, authenticated or not, must be able to fill the cart by pressing the button 'adicionar ao carrinho' in a product page and select the quantity of a product in the cart page, which can be accessed by the header navigation throught the button 'sacola' or when the button 'adicionar ao carrinho' is pressed. In the cart page, the user must be able to finish the order by pressing 'finalizar compra'. If the user is authenticated, they are redirected directly to the address page, otherwise, the user must log in first in the login page and then redirected to the address page.

- **Place Order:**  
    - When finishing the order, the authenticated user will be redirected to the address page, where they must fill in all the necessary fields to the address. If the user has already an address registered, the fields are automatically field with the information from it. With exception of the number, all address fields are required and an error box appears if one of them is not inserted. The CEP field has a specific format and, if the user doesn't insert in this format, an error box appear informing the format is wrong.
    - AAA

- **Edit Profile and Address**

- **Access Orders**

- **User Management**

- **Product Management**

- **Order Management**

- **Review**

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
