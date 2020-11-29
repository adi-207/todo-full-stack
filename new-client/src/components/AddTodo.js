import Axios from 'axios'
import React from 'react'
import { Consumer } from './Context'

class AddTodo extends React.Component {

    state = {
        id: 4,
        title: "",
        complete: false
    }

    update = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    add = (dispatch, e) => {
        e.preventDefault()
        const newTodo = this.state
        Axios.post('/todos', newTodo)
            .then(res => dispatch({
                type: 'ADD',
                payload: res.data
            })
    )
        
        this.setState({title: ''})
    }

    render() {
        return (

            <Consumer>{value => {

                const { dispatch } = value

                return <form onSubmit={this.add.bind(this, dispatch)} className='text-center'>
                            <input type='text' className='form-control rounded-0' placeholder='Write your todo here..' onChange={this.update} value={this.state.title}/>
                            <button className='form-control rounded-0 btn-secondary' type='submit'>Add Todo</button>
                        </form>
            }}
            </Consumer>
            
        )
    }
}

export default AddTodo