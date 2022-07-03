"use strict"

const express = require('express')
const cors = require('cors')
const {v4 : uuid} = require('uuid')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())

const db = new Map()

app.get('/', (req, res) => {
    res.send(Array.from(db.values()))
})

app.get('/:id', (req, res) => {
    res.send(db.get(req.params.id))
})

app.post('/', (req, res) => {
    const id = uuid();
    const task = {
        ...req.body,
        completed: false, 
        id,
        url: req.protocol + '://' + req.get('host') + '/' + id
    };
    db.set(id, task)
    res.send(task)
})

app.patch('/:id', (req, res) => {
    const task = {...db.get(req.params.id), ...req.body}
    db.set(req.params.id, task)
    res.send(task)
})

app.delete('/', (req, res) => {
    db.clear()
    res.send(Array.from(db.values()))
})

app.delete('/:id', (req, res) => {
    const task = db.get(req.params.id)
    db.delete(req.params.id)
    res.send(task)
})

const start = () => {
    app.listen(PORT, () => { console.log(`Server is listeing on ${PORT}`) })
}

module.exports.start = start

