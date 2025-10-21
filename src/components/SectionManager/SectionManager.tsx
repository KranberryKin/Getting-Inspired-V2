import { Route, Routes } from 'react-router-dom';
import Clock from '../clock/Clock.tsx';
import Quotes from '../quotes/Quotes.tsx';
import ToDo from '../todo/ToDoMainPage/ToDo.tsx';
import Weather from '../weather/Weather.tsx';
import './sectionmanager.css'
const SectionManager = () => {
    return (
        <Routes>
            <Route path="/*" element={
                <div className="sectionmanager-container">
                <div className="section phone-hidden"></div>
                <div className="section phone-hidden"></div>
                <div className="weather-section section"><Weather/></div>
                <div className="section phone-hidden"></div>
                <div className="clock-section section"><Clock /></div>
                <div className="section"><ToDo/></div>
                <div className="section phone-hidden"></div>
                <div className="quotes-section section"><Quotes/></div>
                <div className="section phone-hidden"></div>
            </div>
            } />
        </Routes>
    )
}
export default SectionManager;