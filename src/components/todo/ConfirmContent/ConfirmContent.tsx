    import Button from "../../button/Button.tsx";
import "./confirmcontent.css"
    const ConfirmContent = ({onCancel, onConfirm}:{onCancel: () => void, onConfirm: () => void}) => {
        return(
            <div className="confirmcontent-main-container">
                <div className="confirmcontent-left-button" >
                    <Button toggle_function={onCancel} button_label="Cancel"/>
                </div>
                <div>
                    <Button toggle_function={onConfirm} button_label="Confirm"/>
                </div>
            </div>
        )
    }

    export default ConfirmContent;