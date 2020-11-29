import React from 'react'
import { Consumer } from './Context'
import Todo  from './Todo'

const Todos = () => {
    return (
        <Consumer>
            {value => {
                const { todos } = value
                return (
                    todos.map(t => <Todo todo={t} key={t._id} ></Todo>)
                )
            }}
        </Consumer>
    )
}

export default Todos