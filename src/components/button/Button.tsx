import { useEffect, useState } from "react";
import "./button.css"

const Button = ({button_label, toggle_function}: {button_label:string, toggle_function: () => any}) => {
    const [ buttonText, setButtonText] = useState<string>("");


    useEffect(() => {
        if(button_label != ""){
            const assignText = () => {
                setButtonText(button_label);
            }
            assignText();
        }
    }, [button_label]);

    return (
        <div className="button-container" onClick={toggle_function}>
            <div>{buttonText}</div>
        </div>
    );
}
export default Button;