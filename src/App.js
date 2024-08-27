import React from 'react';
import Navbar from "./Components/Navbar";
import PlantIdentifier from './Components/PlantIdentifier';
import './Components/Style.css'
import './Components/PlantIdentifier.css'
// import Footer from "./Components/Footer";
// import './Components/Navbar.css';
// import './Components/Footer.css';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <PlantIdentifier />
      {/* <Footer/> */}
    </div>
  );
}

export default App;
