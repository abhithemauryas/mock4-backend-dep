const {Router}=require("express")
const bookRoute=Router()
const {bookModel}=require("../models/book.model")

bookRoute.post("/post",async(req,res)=>{
    try {
        const {title,author,genre,description,price}=req.body
        let newBook=new bookModel({title,author,genre,description,price})
        await newBook.save()
        res.status(200).send({"msg":"Book registered successful"})
    } catch (error) {
        res.status(400).send({"error": error.message})
        
        
    }
})

bookRoute.get("/get",async(req,res)=>{
    try {
        const book=await bookModel.find()
        res.status(200).send({"msg":"Your book details", data:book})
    } catch (error) {
        console.log("error",error)
        res.status(400).send({"msg":error})
    }
})

bookRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const bookId=req.params.id
        let book=await bookModel.findByIdAndDelete(bookId)
        res.status(200).send({"msg":"Book deleted"})
    } catch (error) {
        res.status(400).send({"msg":error})
        
    }
})
bookRoute.get("/get/filter",async(req,res)=>{
    try {
        const {price, sortBy}=req.query
        let query={}
        if(price){
            query.genre=price
        }
        let sortOption={}
        if(sortBy==="asc"){
            sortOption={price:1}

        }else if(sortBy==="desc"){
            sortOption={price:-1}
        }
        console.log(query)
        const books= await bookModel.find(query).sort(sortOption)
        console.log(books)
        res.status(200).send({"msg":"filter and sorted books",data:books})
    } catch (error) {
       res.status(400).send({"msg":error}) 
    }
})







module.exports={
    bookRoute
}