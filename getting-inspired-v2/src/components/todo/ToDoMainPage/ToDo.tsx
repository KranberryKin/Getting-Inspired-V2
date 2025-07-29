import { useEffect, useState } from 'react';
import { IToDo, toDoService } from '../../../Services/ToDoService.ts';
import Modal, { IModalContent } from '../../modal/Modal.tsx';

import './todo.css'
import ToDoForm from '../ToDoForm/ToDoForm.tsx';
import ConfirmContent from '../ConfirmContent/ConfirmContent.tsx';

const ToDo = () => {
    const service = toDoService;
    const [toDos, setToDos] = useState<IToDo[]>(service._todos);
    const [isVisiable, setIsVisiable] = useState<boolean>(false);
    const [toDoToDelete, setToDoToDelete] = useState<string>("");
    const toDoHeaderContent = "Creating an ToDo";

    useEffect(() => {
        if(!isVisiable){
            setTimeout(() => {
                setIsVisiable(true);
            },1500)
        }
    },[isVisiable])


    const [modalContent, setmodalContent] = useState<IModalContent>({
        header_content: undefined,
        body_content:undefined,
        isClosed:true,
    })

    const toggleToDoForm = async () => {
        setmodalContent({
            header_content:toDoHeaderContent,
            body_content: <ToDoForm  closeModal={closeToDoModal}/>,
            isClosed: false,
        })
        setToDos(await service.getTodos())
    }

     const closeToDoModal = () => {
        setmodalContent({
            header_content: toDoHeaderContent,
            body_content: <ToDoForm  closeModal={toggleToDoForm}/>,
            isClosed: true,
        })
     }

    const switchIsComplete = async (toDoId:string) => {
           setToDos(await service.updateTodo(toDoId));
    }

    const toggleConfirmModal = () => {
        setmodalContent({
            header_content:"Are you sure you want to Delete this ToDo?",
            body_content: <ConfirmContent onCancel={cancelDelete} onConfirm={confirmDelete}/>,
            isClosed: false,
        })
    }
    const cancelDelete = () => {
        setToDoToDelete("");
        setmodalContent({
            header_content:"Are you sure you want to Delete this ToDo?",
            body_content: <ConfirmContent onCancel={cancelDelete} onConfirm={confirmDelete}/>,
            isClosed: true,
        })
    }
    useEffect(() => {
        if(toDoToDelete !== ""){
            toggleConfirmModal();
        }
    }, [toDoToDelete])
    
    const confirmDelete = async () => {
        setToDos(await service.delTask(toDoToDelete))
        setmodalContent({
            header_content:"Are you sure you want to Delete this ToDo?",
            body_content: <ConfirmContent onCancel={cancelDelete} onConfirm={confirmDelete}/>,
            isClosed: true,
        });
        setToDoToDelete("");
    }

    return (
        <>
            <Modal
             header_content={modalContent.header_content} 
             body_content={modalContent.body_content} 
             isClosed={modalContent.isClosed}
             />
            <div className={'todo-container' + (isVisiable ? " show" : "")}>
                <div className='todo-header'>
                    <div>
                        Your ToDos
                    </div>
                    <div>
                        <button onClick={toggleToDoForm}>Create</button>
                    </div>
                </div>
                <div className='todo-body'>
                    {toDos.length ? toDos.map((todo, index) => (
                        <div key={index + todo.id} className='todo-individual-container'>
                            <div className={todo.isCompleted ? "isComplete" : ""}>
                                {todo.description}
                                <input type='checkbox' checked={todo.isCompleted} onChange={() => switchIsComplete(todo.id)}/>
                            </div>
                            <div className='trash-icon' onClick={() => setToDoToDelete(todo.id)}>🗑️</div>
                        </div>
                    )) : "Nothing ToDo here."}
                    
                </div>
            </div>
        </>
    )
}

export default ToDo;