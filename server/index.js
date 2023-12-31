const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')

const authRoute=require('./routes/user')

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('db connected')
}).catch(err=>console.log(err))

app.use(
    cors({
      origin: ["http://localhost:3000"],credentials:true
    })
  ); 
app.use(express.json())


app.use('/api/auth',authRoute)

app.listen(5000,()=>{
    console.log("server started")
})
