import React from 'react'
import Select from 'react-select';

import '../styles/SecondNavbar.css'

function SecondNavbar({handleChangeHeuristic, timeTaken, handleChangeDiagonal}) {
    const heuristicOptions = [
        { value: 'euclidean', label: 'Eulcidean' },
        { value: 'manhattan', label: 'Manhattan' },
        { value: 'diagonal', label: 'Diagonal' }
    ]

    const diagonalOptions = [
        { value: 'true', label: 'true' },
        { value: 'false', label: 'false' }
    ]

    const heuristicChange = selectedOption => {
        handleChangeHeuristic(selectedOption.value);
    };

    const diagonal = (selectedOption) => {
        handleChangeDiagonal(selectedOption.value)
    }

    return (
        <div className="SecondNavbar">
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
            <div className="flex">
                <div>Time taken:</div>
                <p className='time'><span>{parseFloat(timeTaken).toFixed(3)} ms</span></p>
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
        </div>
    )
}

export default SecondNavbar
