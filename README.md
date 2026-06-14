CodeAlpha E-Commerce Store (Task 1)
 Internship Project Submission

This project is submitted as part of CodeAlpha Internship – Task 1: Simple E-Commerce Store.

It is a full-stack web application that demonstrates a basic online shopping system including product listing, user authentication, cart functionality, and order management.

 Project Overview

The application allows users to:

Browse products
View product details
Add/remove items from cart
Register and login securely
Place orders

The system also includes backend APIs, database integration, and structured MVC architecture.

Task Requirements Fulfilled
🛍 Product Listings

✔ Products are displayed dynamically from backend/database
✔ Users can browse all available items

📄 Product Details Page

✔ Each product has a dedicated detail view page
✔ Shows product information before purchase

🛒 Shopping Cart

✔ Add products to cart
✔ Remove products from cart
✔ Update quantities
✔ Cart data managed via frontend state / storage

👤 User Registration & Login

✔ Secure user authentication system implemented
✔ User sessions handled via JWT / authentication logic
✔ Registered users can place orders

📦 Order Processing

✔ Orders are created from cart items
✔ Order data stored in database
✔ User-specific order tracking supported

🗄 Database Integration

✔ Database used for:

Users
Products
Orders

✔ Backend connected using MongoDB + Mongoose (or equivalent)

🏗 Tech Stack
Frontend
HTML
CSS
JavaScript
React.js (if used)
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
JWT (JSON Web Token)
bcrypt.js
📁 Project Structure
CodeAlpha_EcommerceStore/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── index.html
│
└── README.md
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/mustafanasir2231/CodeAlpha_EcommerceStore.git
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend server:

npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm start
🔌 API Endpoints
👤 Auth Routes
POST /api/users/register
POST /api/users/login
🛍 Product Routes
GET /api/products
GET /api/products/:id
📦 Order Routes
POST /api/orders
GET /api/orders/myorders
📸 Screenshots

(Add screenshots of your project here)

Home Page
Product Listing Page
Product Detail Page
Cart Page
Checkout / Order Page
🧠 Key Learning Outcomes
Full-stack web application development
REST API development with Express.js
MongoDB database integration
Authentication using JWT
Frontend and backend integration
MVC architecture implementation



👨‍💻 Developer

Mustafa Nasir
GitHub: https://github.com/mustafanasir2231

⭐ Conclusion

This project successfully demonstrates a basic functional e-commerce system with full-stack implementation.
