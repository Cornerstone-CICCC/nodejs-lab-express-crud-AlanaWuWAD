"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const empolyeeRouter = (0, express_1.Router)();
const employees = [
    {
        id: (0, uuid_1.v4)(),
        firstname: 'john',
        lastname: 'yu',
        age: 44,
        isMarried: false
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: 'ken',
        lastname: 'kou',
        age: 14,
        isMarried: true
    },
];
//get 
empolyeeRouter.get("/", (req, res) => {
    res.status(200).json(employees);
});
//search (http://localhost:3500/employees/search?firstname=john))
empolyeeRouter.get("/search", (req, res) => {
    const { firstname } = req.query;
    const employeeFound = employees.filter(user => user.firstname.toLowerCase().includes(firstname.toLowerCase()));
    if (employeeFound.length === 0) {
        res.status(404).send(`Not found!`);
        return;
    }
    res.status(200).json(employeeFound);
});
//Get one employee by ID
empolyeeRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find(user => user.id === id);
    if (!employee) {
        res.status(404).send(`Not Found!!!!`);
    }
    res.status(200).json(employee);
});
//Add employee
empolyeeRouter.post("/", (req, res) => {
    const newEmployee = {
        id: (0, uuid_1.v4)(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried
    };
    employees.push(newEmployee);
    res.status(201).json(employees);
});
//Update employee by ID (/users/:id)
empolyeeRouter.put("/:id", (req, res) => {
    var _a, _b, _c, _d;
    const { id } = req.params;
    console.log(`id`, id);
    console.log(`query`, req.params);
    const foundIdex = employees.findIndex(user => user.id === id);
    if (foundIdex === -1) {
        res.status(404).send(`Not found!`);
        return;
    }
    const updateEmployee = Object.assign(Object.assign({}, employees[foundIdex]), { firstname: (_a = req.body.firstname) !== null && _a !== void 0 ? _a : employees[foundIdex].firstname, lastname: (_b = req.body.lastname) !== null && _b !== void 0 ? _b : employees[foundIdex].lastname, age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employees[foundIdex].age, isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employees[foundIdex].isMarried });
    employees[foundIdex] = updateEmployee;
    res.status(200).json(employees);
});
//Delete by ID
empolyeeRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const foundIdex = employees.findIndex(user => user.id === id);
    if (foundIdex === -1) {
        res.status(404).send(`Not found!`);
        return;
    }
    employees.splice(foundIdex, 1);
    res.status(200).json(employees);
});
exports.default = empolyeeRouter;
