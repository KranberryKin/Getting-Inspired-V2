import { useEffect, useState } from "react";
import "./clock.css"

function Clock() {
    var today = new Date();
    var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
    var isPM = today.getHours() > 12;
    var isMidnight = today.getHours() === 0;
    const [displayedTime, setDisplayedTime] = useState<string>(isMidnight ?
             "12:" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + " AM" :
              (today.getHours() % 12 || 12) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + (isPM ? " PM" : " AM"));

    useEffect(() => {
        setTimeout(() => {
            today = new Date();
            setDisplayedTime(isMidnight ?
             "12:" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + " AM" :
              (today.getHours() % 12 || 12) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + (isPM ? " PM" : " AM"))
        },60000)
    },[displayedTime])

    return (
        <div>
            <div className="clock-container">
                <div className="date">{date}</div>
                <div className="time">
                    {displayedTime}
                </div>
            </div>
        </div>);
}

export default Clock;