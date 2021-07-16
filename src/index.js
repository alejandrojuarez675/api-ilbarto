import express from 'express';
import morgan from 'morgan';
import shopsRouter from './routes/shops.routes';

const app = express();

// middlewares
app.use((_req, res, next) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'sid, TrackId, FlowId, corpid, Origin, X-Requested-With, Content-Type, Accept, Authorization, PaymentIntention');
    next();
});
app.use(morgan('dev'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// routes
app.use('/shops', shopsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server run on port ${port}`)
});