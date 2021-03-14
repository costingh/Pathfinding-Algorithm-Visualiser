import React from 'react';
import Select from 'react-select';

import '../styles/Navbar.css';

function Navbar(props) {                
    const {clearPath, changeSpeed, runAlgorithm, changeAlgorithm, handleChangeHeuristic, handleChangeDiagonal, clearWalls } = props
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

    const heuristicOptions = [
        { value: 'euclidean', label: 'Eulcidean' },
        { value: 'manhattan', label: 'Manhattan' },
        { value: 'diagonal', label: 'Diagonal' }
    ]

    const diagonalOptions = [
        { value: 'true', label: 'true' },
        { value: 'false', label: 'false' }
    ]

    const handleAlgoChange = selectedOption => {
        changeAlgorithm(selectedOption.value);
    };

    const handleSpeedChange = selectedOption => {
        changeSpeed(selectedOption.value);
    };

    const heuristicChange = selectedOption => {
        handleChangeHeuristic(selectedOption.value);
    };

    const diagonal = (selectedOption) => {
        handleChangeDiagonal(selectedOption.value)
    };

    return (
        <>
            <nav className="Navbar">
                <div className="flex wall" onClick={clearWalls}>
                    <div>Clear Walls</div>
                    <div className="walls"></div>
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
                <div>A* Heuristic: </div>
                    <Select
                        onChange={heuristicChange}
                        options={heuristicOptions}
                        className="selectTag"
                        placeholder={heuristicOptions[0].label}
                        defaultValue={heuristicOptions[0].label}
                    />
                </div>
                <div className="button rounded" onClick={runAlgorithm}>
                    Visualize
                </div>
                <div className="flex">
                    <div>Speed: </div>
                    <Select
                        onChange={handleSpeedChange}
                        options={speedOptions}
                        className="selectTag"
                        placeholder={speedOptions[2].label}
                        defaultValue={speedOptions[2].label}
                    /> 
                </div>
                <div className="flex">
                <div>Allow diagonal search: </div>
                    <Select
                        onChange={diagonal}
                        options={diagonalOptions}
                        className="selectTag"
                        placeholder={diagonalOptions[0].label}
                        defaultValue={diagonalOptions[0].label}
                    />
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


