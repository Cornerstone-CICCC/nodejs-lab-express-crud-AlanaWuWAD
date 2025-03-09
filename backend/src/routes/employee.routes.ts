import { Router, Request, Response } from "express";
import { Employee } from "../type/employee";
import { v4 as uuidv4 } from 'uuid'

const empolyeeRouter = Router()

const employees: Employee[] = [
    {
        id: uuidv4(),
        firstname: 'john',
        lastname: 'yu',
        age: 44,
        isMarried: false
    },
    {
        id: uuidv4(),
        firstname: 'ken',
        lastname: 'kou',
        age: 14,
        isMarried: true
    },
]

//get 
empolyeeRouter.get("/", (req, res)=>{
    res.status(200).json(employees)
})

//search (http://localhost:3500/employees/search?firstname=john))
empolyeeRouter.get("/search", (req:Request<{},{},{},{firstname:string}>, res:Response)=>{
    const {firstname} = req.query
    const employeeFound = employees.filter(user => user.firstname.toLowerCase().includes(firstname.toLowerCase()))

    if(employeeFound.length === 0){
        res.status(404).send(`Not found!`)
        return
    }
    res.status(200).json(employeeFound)
})

//Get one employee by ID
empolyeeRouter.get('/:id', (req: Request<{ id: string}>, res)=>{
    const {id} = req.params
    const employee = employees.find( user => user.id === id)
    if(!employee){
        res.status(404).send(`Not Found!!!!`)
    }
    res.status(200).json(employee)
})

//Add employee
empolyeeRouter.post("/", (req, res)=>{
    const newEmployee : Employee = {
        id: uuidv4(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried
    }
    employees.push(newEmployee)
    res.status(201).json(employees)
})

//Update employee by ID (/users/:id)
empolyeeRouter.put("/:id", (req, res) => {
    const {id} = req.params
    console.log(`id`, id)
    console.log(`query`, req.params)
    const foundIdex = employees.findIndex(user => user.id === id)

    if(foundIdex === -1) {
        res.status(404).send(`Not found!`)
        return
    }

    const updateEmployee: Employee = {
        ...employees[foundIdex],
        firstname: req.body.firstname ?? employees[foundIdex].firstname,
        lastname: req.body.lastname ?? employees[foundIdex].lastname,
        age: req.body.age ?? employees[foundIdex].age,
        isMarried: req.body.isMarried ?? employees[foundIdex].isMarried
    }
    employees[foundIdex] = updateEmployee
    res.status(200).json(employees)
})

//Delete by ID
empolyeeRouter.delete("/:id", (req, res)=>{
    const {id} = req.params
    const foundIdex = employees.findIndex(user => user.id === id)
    if(foundIdex === -1){
        res.status(404).send(`Not found!`)
        return
    }
    employees.splice(foundIdex, 1)
    res.status(200).json(employees)
})

export default empolyeeRouter