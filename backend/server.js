import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
// import morgan from 'morgan'
// import bodyParser from 'body-parser'

import postRouter from './routes/post.js'
import userRoutes from './routes/users.js'
// import expressValidator from 'express-validator'
import DBConn from './config/db.js'

import authRoutes from './routes/auth.js'


const app = express()



// Middleware


// app.use(morgan('dev'))

app.use(express.json())


app.use(cors())
// app.use(cookieParser())
// app.use(expressValidator())

app.use('/posts', postRouter)
app.use('/', authRoutes)
app.use('/', userRoutes)



const PORT = process.env.PORT || 5000

// const DBConnection ='mongodb+srv://levi123:1234567890@levi.4hu76.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// const DBConnection = 'mongodb://localhost:27017/social'

// mongoose.connect(DBConnection, () => console.log(`DataBase Connected MongoDb`))
DBConn()
app.listen(5000, () => console.log(`Server  running at ${PORT}`))

