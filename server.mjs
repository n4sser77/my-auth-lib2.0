import { authenticate, login} from './auth.mjs';
import express from 'express';


const app = express();
const port = 3000

app.use('/user:id',(req, res, next) => { 
    console.log(`Time:`, Date.now())

    next()
})

app.get('/user:id', (req, res) => {
    res.send('HEllo WORLD');
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})