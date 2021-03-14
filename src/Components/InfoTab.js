import React from 'react'
import styled from 'styled-components'

const Infos = styled.div`
    position: absolute;
    z-index: 999;
    background: rgba(0,0,0,.4);
    padding: 40px 30px;
    border-radius: 20px;
    width: 350px;
    height: 500px;
    top: 200px;
    right: 70px;
    cursor: pointer;
`;

const Title = styled.h1`
    color: #fff;
    font-size: 18px;
    text-transform: capitalize;
    font-weight: 800;
    letter-spacing: 1px;
`;

const Close = styled.div`
    color: #4BB543;
    font-size: 15px;
    position: absolute;
    top: 50px;
    right: 40px;
    margin-left: auto;
    font-size: 15px;
    text-transform: lowercase;
    font-weight: 500;
    letter-spacing: .4px;
`;

const Description = styled.div`
    letter-spacing: .6px;
    color: rgb(160, 160, 160);
    font-size: 14px;
    font-weight: 500;
    margin-top: 40px;
`;

export const InfoTab =
    ({handleHideInfos}) => {
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
            <Infos  onMouseDown={add} onMouseUp={remove} >
                <Title>How to use?</Title>
                <Close onClick={handleHideInfos}>hide</Close>
                <Description>On the grid, the start node and the finish node are being displayed. Clicking Visualize button will run the animation of the current selected algorithm.</Description>
                <Description>These nodes can be moved all around the grid, jus by pressing the mouse on the current node and dragging it to the destination.</Description>
                <Description>By clicking on a random grid node, and keeping the mouse pressed, you can draw a wall.(an obstacle for the algorithm)</Description>
                <Description>The reset button will reset just the animated nodes, leaving walls and start/finish nodes untouched. For clearing the walls there is a separate button.</Description>
            </Infos>   
        )
    }