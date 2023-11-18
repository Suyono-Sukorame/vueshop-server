const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi CORS
app.use(cors({
  origin: 'http://localhost:8080', // Atur domain frontend Vue.js Anda
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Jika menggunakan autentikasi dengan cookie atau header Authorization
}));

app.use('/img', express.static(path.join(__dirname, './public/img')));

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Menghilangkan opsi useFindAndModify karena sudah tidak didukung
    // useFindAndModify: false
  })
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to vueshop-server'
  });
});

require('./app/routes/product.routes')(app);
require('./app/routes/order.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


