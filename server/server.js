const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const db = "mongodb://localhost:27017/todofullstack"

mongoose.connect(db, ({
    useNewUrlParser: true,
    useUnifiedTopology: true
}))
    .then(console.log('connected to mongodb'))
    .catch((err) => {
        console.log(err)
    })

const todoSchema = new mongoose.Schema({
    title: String,
    complete: {
        type: Boolean,
        default: false
    }
})

const todo = mongoose.model("todo", todoSchema)

app.get("/todos", async (req, res)=> {
    const response  = await todo.find()

    res.json(response)
})

app.post('/todos', async (req, res) => {
    const newTodo = new todo({
        title: req.body.title
    })

    
    const response = await newTodo.save()
    try {
        res.status(200).send(response)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/todos/:id',  (req, res) => {

    todo.findOneAndDelete({ _id: req.params.id })
        .then((task) => res.send(task))
    

})

app.listen(5000, () => {
    console.log('server is running at port 5000')
})