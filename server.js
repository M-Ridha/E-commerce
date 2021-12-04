require ('dotenv').config()
const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const fileUpload = require ('express-fileupload')
const cookieparser = require ('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))


//Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))






//connect to mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err ;
    console.log('connected to MongoDB')
})


const PORT = process.env.PORT || 8080 
app.listen(PORT, () => {
    console.log('Server is running on port', PORT )
} )