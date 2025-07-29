import { useEffect, useState } from "react";
import "./clock.css"

function Clock() {
    var [isVisiable, setIsVisiable] = useState<boolean>(false);
    var today = new Date();
    var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
    var isPM = today.getHours() > 12;
    var isMidnight = today.getHours() === 0;
    const [isMilitaryTime, setIsMilitaryTime] = useState<boolean>(false);
    const [displayedStandardTime, setdisplayedStandardTime] = useState<string>(isMidnight ?
                "12:" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + " AM" :
                (today.getHours() % 12 || 12) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + (isPM ? " PM" : " AM")
            );
    const [displayMilitaryTime, setDisplayMilitaryTime] = useState<string>(isMidnight ? 
                "00:" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()): 
                (today.getHours()) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes())
    )

    useEffect(() => {
        if(!isVisiable){
            setTimeout(() => {
                setIsVisiable(true);
            },1000)
        }
    },[isVisiable])

    useEffect(() => {
        setTimeout(() => {
            today = new Date();
            setdisplayedStandardTime(isMidnight ?
                "12:" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + " AM" :
                (today.getHours() % 12 || 12) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + (isPM ? " PM" : " AM"));
            setDisplayMilitaryTime(isMidnight ? 
                "00:" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()): 
                (today.getHours()) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()));
        },60000)
    },[displayedStandardTime])

    const changedisplayedStandardTime = () => {
        setIsMilitaryTime(!isMilitaryTime);
    }

    return (
        <div>
            <div className={"clock-container" + (isVisiable ? " show" : "")}>
                <div className="date">{date}</div>
                <div className="time" title={isMilitaryTime ? "Change to Standard Time" : "Change to Military Time"} onClick={changedisplayedStandardTime}>
                    {isMilitaryTime ?  displayMilitaryTime : displayedStandardTime}
                </div>
            </div>
        </div>);
}

export default Clock;