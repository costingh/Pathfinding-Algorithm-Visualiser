import React from 'react';
import Select from 'react-select';

import '../styles/Navbar.css';

function Navbar(props) {                
    const {clearPath, changeSpeed, runAlgorithm, changeAlgorithm } = props
    const algorithmOptions = [
        { value: 'Dijkstra', label: 'Dijkstra' },
        { value: 'A*', label: 'A*' },
        { value: 'BFS', label: 'BFS' },
        { value: 'DFS', label: 'DFS' }
    ]
    const speedOptions = [
        { value: '100', label: 'Very Slow' },
        { value: '50', label: 'Slow' },
        { value: '25', label: 'Normal' },
        { value: '10', label: 'Fast' },
        { value: '1', label: 'Very Fast' }
    ]

    const handleAlgoChange = selectedOption => {
        changeAlgorithm(selectedOption.value);
    };

    const handleSpeedChange = selectedOption => {
        changeSpeed(selectedOption.value);
    };

    return (
        <>
            <nav className="Navbar">
                <div className="flex button-generate-start">
                    <div className="start"></div>
                    <div>Start</div>
                </div>
                <div className="flex button-generate-finish">
                    <div className="target"></div>
                    <div>Target</div>
                </div>
                <div className="flex">
                    <div>Algo: </div>
                    <Select
                        onChange={handleAlgoChange}
                        options={algorithmOptions}
                        className="selectTag"
                        placeholder={algorithmOptions[0].label}
                        defaultValue={algorithmOptions[0].label}
                    />
                </div>
                <div className="flex">
                    <div>Speed </div>
                    <Select
                        onChange={handleSpeedChange}
                        options={speedOptions}
                        className="selectTag"
                        placeholder={speedOptions[2].label}
                        defaultValue={speedOptions[2].label}
                    />
                </div>

                {/* <div className="flex">
                    <div className="unvisited"></div>
                    <div>Unvisited Node</div>
                </div> */}

                <div className="button rounded" onClick={runAlgorithm}>
                    Visualize
                </div>
                <div className="flex">
                    <div className="visited"></div>
                    <div>Visited</div>
                </div>
                <div className="flex">
                    <div className="wall"></div>
                    <div>Wall</div>
                </div>
                <div className="flex">
                    <div className="shortest-path"></div>
                    <div>Shortest-Path</div>
                </div>
                <div className="flex reset" onClick={clearPath}>
                    <div className="icon"></div>
                    <div className="text">Reset</div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;


