# 📚 Online Book Review Application with Node.js, Express & JWT

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

---

## 🌟 About This Project

This project is an **Online Book Review Application** built as part of the **Developing Back-End Apps with Node.js and Express** course offered by **IBM Full Stack Software Developer Professional Certificate Program**.  

**It demonstrates:**

- REST API creation with **Node.js** and **Express**  
- **Session-level authentication** using JWT  
- **CRUD operations** on books and reviews  
- Use of **Promises** and **Async/Await** with **Axios**  
- Testing APIs using **Postman** or **curl**  

This application allows **general users** to browse books and reviews, and **registered users** to add, update, or delete their reviews.

---

### ✨ Features / Topics Covered

  📖 Browse all books  
  🔖 Search by ISBN  
  ✍️ Search by Author  
  🏷️ Search by Title  
  💬 View Book Reviews  
  🆕 Register new user  
  🔐 User Login with JWT  
  ✍️ Add / Modify Reviews  
  🗑️ Delete Reviews  
  ⚡ Async/Await & Promises with Axios  
  🛠️ CRUD Operations with Express  
  🧪 API Testing with Postman / curl  

**Advanced Features:**
- Tasks 10–13: Async/Await or Promises with Axios for all book search functionalities ⚡  

---

## 🚀 Installation

**Clone the repo**
```bash
git clone https://github.com/usan-here/expressBookReviews.git
```
***Go to project folder**
```bash
cd expressBookReviews/final_project
```

**Install dependencies**
```bash
npm install
```

**Start the server**
```bash
node index.js
```

## 📌 API Endpoints Overview
Endpoint	Method	Description
/	GET	Get all books
/isbn/:isbn	GET	Get book by ISBN
/author/:author	GET	Get books by author
/title/:title	GET	Get books by title
/review/:isbn	GET	Get book reviews
/register	POST	Register new user
/customer/login	POST	Login as registered user
/customer/auth/review/:isbn	PUT	Add/Modify a review
/customer/auth/review/:isbn	DELETE	Delete your review


## 👨‍💻 Author

### Umme Sanjeda
**GitHub:** [https://github.com/usan-here](https://github.com/usan-here)


## 🧩 Contributing

Love collaboration! 🤝

- Feel free to fork the repository and experiment with new features

- Share your improvements via Pull Requests

- Respect the existing structure and add meaningful commits

Let's make book reviewing fun and organized! 🎉



---

## 📄 License

This project is licensed under the **[Apache License 2.0](LICENSE)**.

