import { useEffect, useState } from 'react';
import './modal.css'
export interface IModalContent{
    header_content?:string;
    body_content?: React.JSX.Element;
    isClosed: boolean;
    uponSubmit?: () => any;
}
const Modal = (contents:IModalContent) => {
    const [modalContent,setModalContent]= useState<IModalContent>({
        header_content: contents.header_content,
        body_content: contents.body_content,
        isClosed: contents.isClosed,
        uponSubmit: contents.uponSubmit,
    });

    useEffect(() => {
        setModalContent({
        header_content: contents.header_content,
        body_content: contents.body_content,
        isClosed: contents.isClosed,
        uponSubmit: contents.uponSubmit,
        })
    },[contents.header_content, contents.body_content, contents.isClosed, contents.uponSubmit])

    const toggleModal = () => {
        setModalContent({...modalContent, isClosed: !modalContent.isClosed})
    }

    return (
        <div className="modal-container" hidden={modalContent.isClosed}>
            <div className="modal-header">
                <div>
                    {modalContent.header_content ? modalContent.header_content : null}
                </div>
                <div className='modal-toggle' onClick={toggleModal}>
                    X
                </div>
            </div>
            <div className="modal-body">
                {modalContent.body_content ? modalContent.body_content : null}
            </div>
        </div>
    )
}
export default Modal;
