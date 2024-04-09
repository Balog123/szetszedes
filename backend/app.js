const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

const fileHandler = require('./fileHandler');
const authenticateUser = require('./auth/authUser');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const userDetailsRoutes = require('./routes/userRoutes');
const latest_productRoutes = require('./routes/latest-productRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productRoutes');
const related_productsRoutes = require('./routes/relatedproductsRoutes');
const updateUserRoutes = require('./routes/updateUserRoutes');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/css', express.static(path.resolve(__dirname, '..', 'frontend', 'css')));
app.use('/images', express.static(path.resolve(__dirname, '..', 'frontend', 'images')));
app.use('/js', express.static(path.resolve(__dirname, '..', 'frontend', 'js')));
app.use(express.static(path.resolve(__dirname, '..', 'frontend')));

app.get('/', fileHandler.sendIndex);
app.use('/api/latest-products', latest_productRoutes);
app.use('/api/categories', categoriesRoutes);

app.get('/regisztracio', fileHandler.sendRegister);
app.use('/api/registration', registerRoutes);

app.get('/bejelentkezes', fileHandler.sendLogin);
app.use('/api/login', loginRoutes);

app.get('/profil', fileHandler.sendProfile);
app.use('/api/logout', logoutRoutes);
app.use('/api/user', userDetailsRoutes);
app.use('/api/save-user-details', updateUserRoutes);

app.get('/products', fileHandler.sendAllProducts)
app.use('/api/products', productsRoutes);
app.use('/api/related-products', related_productsRoutes );

app.get('/products/:id', fileHandler.sendSingleProducts)

app.get('/check-auth', authenticateUser, (req, res) => {
    console.log('User is authenticated:', req.user);
    res.json({ success: true, data: req.user });
});

app.listen(process.env.PORT, () => console.log(`Alkalmazás ${process.env.PORT} porton fut`));
