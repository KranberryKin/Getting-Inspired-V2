import { useState } from 'react';
import { toDoService } from '../../Services/ToDoService.ts';
import Modal, { IModalContent } from '../modal/Modal.tsx';

import './todo.css'

const ToDo = () => {
    const service = toDoService;
    const toDoHeaderContent = "Creating an ToDo";
    const ToDoForm = () => {
        interface IToDoFormContent{
            name: string,

        }
        return (
            <div className='todo-form-container'>
                Hello from ToDoForm
            </div>
        )
    }
    const ConfirmContent = () => {
        return(
            <div>

            </div>
        )
    }

    const [todoModalContent, setTodoModalContent] = useState<IModalContent>({
        header_content: undefined,
        body_content:undefined,
        isClosed:false,
        uponSubmit: undefined,
    })

    const toggleToDoForm = () => {
        setTodoModalContent({
            header_content:toDoHeaderContent,
            body_content: <ToDoForm />,
            isClosed: false,
            uponSubmit: undefined,
        })
    }

    return (
        <>
            <Modal
             header_content={todoModalContent.header_content} 
             body_content={todoModalContent.body_content} 
             isClosed={todoModalContent.isClosed}
             uponSubmit={todoModalContent.uponSubmit}
             />
            <div className='todo-container'>
                <div className='todo-header'>
                    <div>
                        Your ToDos
                    </div>
                    <div>
                        <button onClick={toggleToDoForm}>Create</button>
                    </div>
                </div>
                <div className='todo-body'>
                    Hello From ToDo body
                </div>
            </div>
        </>
    )
}

export default ToDo;