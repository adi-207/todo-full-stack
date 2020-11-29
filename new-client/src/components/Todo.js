import Axios from 'axios'
import React from 'react'
import { Consumer } from './Context'


class Todo extends React.Component {

    state = {
        complete: false
    }

    style = () => {
        
        const { complete } = this.props.todo
        
        return { textDecoration: complete ? 'line-through': 'none' }
    }

    toggle = (id, dispatch, complete) => {
        
        if(complete === true) {
            dispatch({
                type: "TOGGLE",
                payload: id
            })
        } else {
            dispatch({
                type: "TOGGLE_2",
                payload: id
            })
        }
    }

    remove = (id, dispatch) => {
        Axios.delete(`/todos/${id}`)
            .then(() => (

             dispatch({
                type: "REMOVE",
                payload: id
            }))
            
        )

        window.location.reload(false);
    }

  

    render() {
        const { title, _id , complete} = this.props.todo
        
        return (
        <Consumer>{value => {

            const { dispatch } = value

            return <h3 className='text-center bg-light border-bottom' style={this.style()}>
                        <i className='far fa-times-circle fa-sm float-left m-1 text-danger ' onClick={this.remove.bind(this, _id, dispatch)} ></i>{title}
                        <input type='checkbox' className='m-2 float-right' onChange={this.toggle.bind(this, _id, dispatch , complete)}/>
                </h3>
            
        }}</Consumer>
            
        )
    }
}

export default Todo