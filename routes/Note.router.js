const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/Note.model")

noteRouter.get("/",async(req,res)=>{
    //verif
    const note=await NoteModel.find()

    res.send(note)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try {
        const newNote=new NoteModel(payload)
        await newNote.save()
        res.send("Created the note")
    } catch (error) {
        res.send({"msg":"Something went wrong"})
    }
 
})
noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the note")
        }
    } catch (error) {
        console.log(err)
        res.send("Something went wong")
    }
   
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try {
        await NoteModel.findByIdAndDelete({"_id":id})
        res.send("Deleted the note")
    } catch (error) {
        console.log(err)
        res.send("Something went wong")
    }
})


module.exports={noteRouter}