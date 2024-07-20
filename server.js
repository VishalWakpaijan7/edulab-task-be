const express = require('express');
const app = express();
const pdfGenRouter = require('./routes/pdf-generator');
const { errorHandler, notFoundHandler } = require('./middlewares/errorhandler');
const PORT = 8080;

app.use(express.json());
app.use('/api', pdfGenRouter);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(8080, () => console.log(`server running on port: ${PORT}`));