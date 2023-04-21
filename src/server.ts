import express from 'express';
import bodyParser from 'body-parser';

import { productRouter } from './routes/product.route';
import { userRouter } from './routes/user.route';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/product', productRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
