import { useEffect, useState } from 'react';
import './modal.css'
import Button from '../button/Button.tsx';
export interface IModalContent{
    header_content?: string;
    body_content?: React.JSX.Element;
    isClosed: boolean;
    close_modal_function?: () => any
}
const Modal = (contents:IModalContent) => {
    const [modalContent,setModalContent]= useState<IModalContent>({
        header_content: contents.header_content,
        body_content: contents.body_content,
        isClosed: contents.isClosed,
        close_modal_function: contents.close_modal_function,
    });

    useEffect(() => {
        setModalContent({
        header_content: contents.header_content,
        body_content: contents.body_content,
        isClosed: contents.isClosed,
        close_modal_function: contents.close_modal_function || undefined,
        })
    },[contents.header_content, contents.body_content, contents.isClosed, contents.close_modal_function])

    const toggleModal = () => {
        if(modalContent.close_modal_function != undefined){
              modalContent.close_modal_function();
        }else{
            setModalContent({...modalContent, isClosed: !modalContent.isClosed})
        }
    }

    return (
        <div className={"modal-container " + (modalContent.isClosed ? "" : "show")}>
            <div className="modal-header">
                <h4>
                    {modalContent.header_content ? modalContent.header_content : null}
                </h4>
                <Button toggle_function={toggleModal} button_label='X'/>
            </div>
            <div className="modal-body">
                {modalContent.body_content ? modalContent.body_content : null}
            </div>
        </div>
    )
}
export default Modal;
