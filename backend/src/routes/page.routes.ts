import { Router, Request, Response } from "express";

const pageRouter = Router()

//Home
pageRouter.get("/", (req, res)=>{
    res.status(200).send(`Home page`)
})

export default pageRouter