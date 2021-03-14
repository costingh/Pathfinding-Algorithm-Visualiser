import React from 'react'
import Select from 'react-select';

import '../styles/SecondNavbar.css'

function SecondNavbar() {

    return (
        <div className="SecondNavbar">
            <div className="flex button-generate-start">
                <div className="start"></div>
                <div>Start</div>
            </div>
            <div className="flex button-generate-finish">
                <div className="target"></div>
                <div>Target</div>
            </div>
            <div className="flex">
                <div className="unvisited"></div>
                <div>Unvisited Node</div>
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
        </div>
    )
}

export default SecondNavbar
