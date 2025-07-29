import { useEffect, useState } from "react";
import { IToDo, toDoService } from "../../../Services/ToDoService.ts";

const ToDoForm = ({closeModal}: {closeModal: () => void }) => {
        const service = toDoService;

        interface IToDoFormContent {
            id: string,
            descrition: string,
            isComplete: boolean,
        } 

        const [toDoFormData, setToDoFormData] = useState<IToDoFormContent>({
            id: "",
            descrition: "",
            isComplete: false,
        })

        useEffect(() => {
            const setFormId = async () => {
                setToDoFormData({
                    ...toDoFormData,
                    id: await service.getNewId(),
                });
            }
            if(toDoFormData.id === ""){
                setFormId();
            }
        },[toDoFormData.id])

        const clearForm = () => {
            setToDoFormData({
                id: "",
                descrition: "",
                isComplete: false,
            })
        }

        const createToDo = async () => {
            const toDoToCreate: IToDo = {
                id: toDoFormData.id,
                description: toDoFormData.descrition,
                isCompleted: false,
            }
            await service.addTodo(toDoToCreate);
            closeModal();
            clearForm();
        }

        const updateForm = (description: string) => {
            setToDoFormData({
                ...toDoFormData,
                descrition: description,
            });
        };

        return (
            <div className='todo-form-container'>
                <label htmlFor="description">{"What do you need to do?"}</label>
                <input name='description' value={toDoFormData.descrition} onChange={(e) => updateForm(e.target.value)} type="text" />
                <div>
                    <button onClick={clearForm}>
                        Clear
                    </button>
                    <button onClick={createToDo}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }

export default ToDoForm;