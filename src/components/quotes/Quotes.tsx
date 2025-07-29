import { useEffect, useState } from "react";
import { quotes } from "../../Data/quotes";
import "./quotes.css"

const Quotes = () => {
    const [isVisiable, setIsVisiable] = useState<boolean>(false);
    useEffect(() => {
        if(!isVisiable){
            setTimeout(() => {
                setIsVisiable(true);
            },2000)
        }
    },[isVisiable])
const randomIndex = Math.floor(Math.random() * quotes.length);
    return (
    <div className={"quotes-container" + (isVisiable ? " show" : "")}>
        <div>
           {quotes[randomIndex].Quote}
        </div>
        <div className="author-container">
            By : {quotes[randomIndex].Author}
        </div>
    </div>)
}

export default Quotes;