const express = require('express');
const app = express();
const cors = require('cors');
const pdfGenRouter = require('./routes/pdf-generator');
const { errorHandler, notFoundHandler } = require('./middlewares/errorhandler');
const PORT = 8080;

const corsOptions = {
    origin: 'http://localhost:4200', // Allow only this origin
    methods: ['GET'], // Allow only these methods
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', pdfGenRouter);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(8080, () => console.log(`server running on port: ${PORT}`));