# MVC
# What is MVC?
Sure Amar! Below is the clean, short, and professional **`README.md` format** for **MVC architecture in Node.js with Express.js**, structured for a scalable and maintainable backend project.

---

```md
# Node.js MVC Project Structure with Express.js

This guide explains the MVC (Model-View-Controller) pattern in Node.js and provides a clean, scalable project structure using Express.js.

---

## What is MVC?

| Layer       | Responsibility                            |
|-------------|--------------------------------------------|
| **Model**   | Handles data, DB schema, and DB operations |
| **View**    | User interface (in APIs, this is usually skipped) |
| **Controller** | Business logic; connects Model & Route |

In APIs, the View is typically replaced by JSON responses.

---

## Folder Structure

```

project-root/
├── app.js                 # Main entry point
├── routes/                # Route definitions
│   ├── user.routes.js
│   └── admin.routes.js
├── controllers/           # Business logic
│   ├── user.controller.js
│   └── admin.controller.js
├── models/                # Mongoose or DB models
│   ├── user.model.js
│   └── product.model.js
├── middlewares/           # Reusable middleware
│   ├── auth.middleware.js
│   └── error.middleware.js
├── config/                # DB and environment config
│   └── db.js
├── validations/           # Input validations (Joi, express-validator)
├── services/              # Optional: reusable business services
├── utils/                 # Helpers and utility functions
└── package.json

````

---

## app.js

```js
const express = require('express');
const app = express();

const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const errorHandler = require('./middlewares/error.middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
````

---

## Example Flow (User)

### 1. routes/user.routes.js

```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;
```

### 2. controllers/user.controller.js

```js
const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};
```

### 3. models/user.model.js

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
```

---

## Error Middleware

### middlewares/error.middleware.js

```js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
};
```

---

## Database Config (Optional)

### config/db.js

```js
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

module.exports = connectDB;
```

---

## Best Practices

* Keep controllers focused; move logic to services if needed
* Group files by domain (user, product, order, etc.)
* Use `dotenv` for environment variables
* Add route-specific middleware for auth/validation
* Use modular file structure from the start

---

## Summary

* Follow MVC: Model (data), Controller (logic), Router (HTTP layer)
* Makes code organized, scalable, and easy to maintain
* Ideal for real-world production-ready Node.js apps

```

---

Let me know if you’d like this:
- Turned into a working ZIP or GitHub repo
- With unit testing setup (Jest or Mocha)
- With authentication (JWT + middleware)

You're thinking like a system designer — great job building scalable architecture!
```

