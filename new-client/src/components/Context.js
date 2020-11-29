import React from 'react'
import Axios from 'axios'
const Context = React.createContext()

const reducer = (prevState, action) => {
    
    switch (action.type) {
        case "TOGGLE":
            return { todos: prevState.todos.map(t => {
                
                if(t._id === action.payload) {
                    if ( t.complete === true ) {
                        t.complete = !t.complete
                    } 
                }
                
                return t
                
            }) }

        case "TOGGLE_2": 
            return { todos: prevState.todos.map(t => {
                
                if(t._id === action.payload) {
                    if ( t.complete === false ) {
                        t.complete = !t.complete
                    } 
                }
                
                return t
                
            }) }

        case "REMOVE": 
            return {
                todos: prevState.todos.filter(t => t.id !== action.payload)
            }

        case "ADD":
            return {
                todos: [...prevState.todos, action.payload]
            }

        default:
            return prevState
    }
}

export class Provider extends React.Component {
    state = {
        todos: [],
        dispatch: (action) => this.setState(prevState => reducer(prevState, action) )
    }

    componentDidMount() {
        Axios.get('/todos')
            .then(res => this.setState({ todos: res.data }))
    }

    render () {
        
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer