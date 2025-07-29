import React from 'react';
import './App.css';
import { PicFileLocations } from './Assets/PicFileLocations.ts'
import SectionManager from './components/SectionManager/SectionManager.tsx';

function App() {
  const randomIndex = Math.floor(Math.random() * PicFileLocations.length);
  const selectedImage = PicFileLocations[randomIndex]

  
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
          <SectionManager /> 
      </header>
    </div>
  );
}

export default App;
