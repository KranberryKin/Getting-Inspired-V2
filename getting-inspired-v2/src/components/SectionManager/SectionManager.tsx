import Clock from '../clock/Clock.tsx';
import Quotes from '../quotes/Quotes.tsx';
import Weather from '../weather/Weather.tsx';
import './sectionmanager.css'
const SectionManager = () => {
    return (
        <div className="sectionmanager-container">
            <div className="section"></div>
            <div className="section"></div>
            <div className="weather-section section"><Weather/></div>
            <div className="section"></div>
            <div className="clock-section section"><Clock /></div>
            <div className="section"></div>
            <div className="section"></div>
            <div className="quotes-section section"><Quotes/></div>
            <div className="section"></div>
        </div>
    )
}
export default SectionManager;