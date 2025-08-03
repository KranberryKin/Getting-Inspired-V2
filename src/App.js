import './App.css';
import { PicFileLocations } from './Assets/PicFileLocations.ts'
import SectionManager from './components/SectionManager/SectionManager.tsx';
import {BrowserRouter as Router} from "react-router-dom";


export const App = () => {
  const randomIndex = Math.floor(Math.random() * PicFileLocations.length);
  const selectedImage = randomIndex >= 0 ? PicFileLocations[randomIndex] : "";

  
  return (
    <div className="App">
      <header
       className="App-header" 
       style={
        {
         backgroundImage:`url(${selectedImage})`,
         backgroundSize:'cover',
         backgroundRepeat:'no-repeat',
        }
         }>
          <Router>
            <SectionManager /> 
          </Router>
      </header>
    </div>
  );
}

export default App;
