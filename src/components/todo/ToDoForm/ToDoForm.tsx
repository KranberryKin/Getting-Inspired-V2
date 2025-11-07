import { useEffect, useState } from "react";
import { IToDo, toDoService } from "../../../Services/ToDoService.ts";
import Button from "../../button/Button.tsx";
import "./todoform.css"

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
            if(toDoFormData.descrition !== ""){
                const toDoToCreate: IToDo = {
                    id: toDoFormData.id,
                    description: toDoFormData.descrition,
                    isCompleted: false,
                }
                await service.addTodo(toDoToCreate);
                closeModal();
                clearForm();
            }else{
                window.confirm("You need to have something ToDo to create one. (Description Missing)")
            }
        }

        const updateForm = (description: string) => {
            setToDoFormData({
                ...toDoFormData,
                descrition: description,
            });
        };

        return (
            <div className='todo-form-container'>
                <label className="todo-form-label" htmlFor="description">{"What do you need to do?"}</label>
                <input name='description' value={toDoFormData.descrition} onChange={(e) => updateForm(e.target.value)} type="text" />
                <div className="todo-form-button-container">
                    <div className="todo-form-left-button-container">
                        <Button toggle_function={clearForm} button_label="Clear" />
                    </div>
                    <Button toggle_function={createToDo} button_label="Submit"/>
                </div>
            </div>
        )
    }

export default ToDoForm;