const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// MiddleWare:
app.use(cors());
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("courier service is running")
})

app.listen(port,()=>{
    console.log(`courier service is running at ${port}`);
})