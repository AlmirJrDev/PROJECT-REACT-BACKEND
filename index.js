const { request, response } = require('express')
const express = require('express')
const req = require('express/lib/request')
const uuid = require("uuid")
const cors = require("cors")


const port = 3001;
const app = express();
app.use(express.json());
app.use(cors())


const users = []    

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found " })
    }

    request.userIndex = index
    request.userId = id

    next()

}

app.get('/project', (request, response) => {

    return response.json(users)

})

app.post('/project', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(user)

})

app.put('/project/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const update = { id, name, age }

    users[index] = update

    return response.json(update)

})

app.delete('/project/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()

})




















app.listen(port, () => {
    console.log(`😎Server starded on port ${port}`)
})