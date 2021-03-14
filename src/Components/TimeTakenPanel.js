import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
    position: absolute;
    bottom: 15px;
    left: 44%;
    height: 40px;
    padding: 5px 30px;
    display: inline-block;
    border-radius: 10px;
    background: rgba(0,0,0,0.5);
    color: #ddd;
    z-index: 999;
    cursor: pointer;
`;

const Title = styled.h1`
    color: #ddd;
    font-size: 16px;
    font-weight: 400;
    pointer-events: none;
`;

const Description = styled.div`
    color: #4BB543;
    text-transform: lowercase;
    margin-left: 15px;
    font-size: 16px; 
    display: inline-block;
    font-weight: 400;
    pointer-events: none;
`;

export const TimeTakenPanel = ({timeTaken}) => {
    let offsetX, offsetY

    const move = e => {
        const el = e.target
        el.style.left = `${e.pageX - offsetX}px`
        el.style.top = `${e.pageY - offsetY}px`
    }

    const add = e => {
        const el = e.target
        offsetX = e.clientX - el.getBoundingClientRect().left
        offsetY = e.clientY - el.getBoundingClientRect().top
        el.addEventListener('mousemove', move)
    }
    
    const remove = e => {
        const el = e.target
        el.removeEventListener('mousemove', move)
    }
    
    return (
        <Panel  onMouseDown={add} onMouseUp={remove} >
            <Title>
                Time taken: 
                <Description>{parseFloat(timeTaken).toFixed(3)} ms</Description>
            </Title>
        </Panel>   
    )
}