import React from 'react'
import Select from 'react-select';

import '../styles/SecondNavbar.css'

function SecondNavbar({handleChangeHeuristic, timeTaken, algorithm}) {
    const heuristicOptions = [
        { value: 'euclidean', label: 'Eulcidean' },
        { value: 'manhattan', label: 'Manhattan' },
        { value: 'diagonal', label: 'Diagonal' }
    ]

    const heuristicChange = selectedOption => {
        handleChangeHeuristic(selectedOption.value);
    };

    return (
        <div className="SecondNavbar">
            {algorithm === 'A*' && 
                <div className="flex">
                    <div>Heuristic: </div>
                    <Select
                        onChange={heuristicChange}
                        options={heuristicOptions}
                        className="selectTag"
                        placeholder={heuristicOptions[0].label}
                        defaultValue={heuristicOptions[0].label}
                    />
                </div>
            }
            <div className="flex">
                <div>Time taken:</div>
                <p className='time'>{parseFloat(timeTaken).toFixed(3)}</p>
            </div>
        </div>
    )
}

export default SecondNavbar
