import { quotes } from "../../Data/quotes";
import "./quotes.css"

const Quotes = () => {
const randomIndex = Math.floor(Math.random() * quotes.length);
    return (
    <div className="quotes-container">
        <div>
           {quotes[randomIndex].Quote}
        </div>
        <div className="author-container">
            By : {quotes[randomIndex].Author}
        </div>
    </div>)
}

export default Quotes;