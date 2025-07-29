    import "./confirmcontent.css"
    const ConfirmContent = ({onCancel, onConfirm}:{onCancel: () => void, onConfirm: () => void}) => {
        return(
            <div className="button-container">
                    <button onClick={onCancel}>Cancel</button>
                    <button className="button-class" onClick={onConfirm}>Confirm</button>
            </div>
        )
    }

    export default ConfirmContent;