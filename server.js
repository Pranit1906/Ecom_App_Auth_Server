const express = require('express');
const { tokenTableInitializer } = require('./Controllers/userToken.controller');
const app = express();
const authRouter = require('./Routes/token.router');
const PORT = 4000;
app.use(express.json());
app.use("/auth", authRouter);

app.get('/',(req, res)=>{
    res.status(200).send({message:'Welcome to Auth-Server'});
});

/**/
(()=>{
    tokenTableInitializer();
})();

app.listen(PORT,(err)=>{
    if(err){
        console.log('err occured while starting',err)
    }
    console.log(`Server is Listening at port: ${PORT}`);
})