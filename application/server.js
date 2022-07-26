const express = require('express');
const apiRoutes = require('./routes/api')
const webRoutes = require('./routes/web')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.listen(PORT, () =>
  console.log(`App is running at port:${PORT}`)
);