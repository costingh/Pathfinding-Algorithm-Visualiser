import DijkstraPath from "./Components/FindPath/DijkstraPath";
/* import Navbar from './Components/Navbar/Navbar'; */

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Navbar
            clearPath={this.resetAll.bind(this)}
            changeSpeed={this.handleChangeSpeed.bind(this)}
            runAlgorithm={this.visualizeDijkstra.bind(this)}
            changeAlgorithm={this.handleChangeAlgorithm.bind(this)}
            setRandomStart={this.setRandomStart.bind(this)}
            setRandomFinish={this.generateRandomFinish.bind(this)}
          /> */}
      <DijkstraPath></DijkstraPath>
    </div>
  );
}

export default App;


