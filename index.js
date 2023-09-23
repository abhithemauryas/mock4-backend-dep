const express= require("express")
const {connection}=require("./detabase/db")
const {bookRoute}=require("./routes/book.route")

require("dotenv").config()
const cors= require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.use(bookRoute)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Db is connected")
    } catch (error) {
        console.log(error,"Db is not connected")
    }
    console.log(`server is running at the port ${process.env.port}`)
})