import { useEffect, useState } from 'react';
import './modal.css'
export interface IModalContent{
    header_content?: string;
    body_content?: React.JSX.Element;
    isClosed: boolean;
}
const Modal = (contents:IModalContent) => {
    const [modalContent,setModalContent]= useState<IModalContent>({
        header_content: contents.header_content,
        body_content: contents.body_content,
        isClosed: contents.isClosed,
    });

    useEffect(() => {
        setModalContent({
        header_content: contents.header_content,
        body_content: contents.body_content,
        isClosed: contents.isClosed,
        })
    },[contents.header_content, contents.body_content, contents.isClosed])

    const toggleModal = () => {
        setModalContent({...modalContent, isClosed: !modalContent.isClosed})
    }

    return (
        <div className={"modal-container " + (modalContent.isClosed ? "" : "show")}>
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
