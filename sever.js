const express = require('express');
const app = express();
const authRouter = require('./Routes/token.router');
const PORT = 4000;
app.use(express.json());
app.use("/token", authRouter);

app.get('/',(req, res)=>{
    res.status(200).send({message:'Welcome to Auth-Server'});
})

(()=>{
    
})();
app.listen(PORT,()=>{
    console.log(`Server is Listening at port: ${PORT}`);
})