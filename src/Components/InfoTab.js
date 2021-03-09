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

const Description = styled.div`
    letter-spacing: .6px;
    color: rgb(160, 160, 160);
    font-size: 14px;
    font-weight: 500;
    margin-top: 40px;
`;

export const InfoTab =
    () => {
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
                <Description>To visialize the algorithm, you need 2 nodes on the grid: a start and a finish one. You can generate them randomly, just by clicking on the buttons from the navbar above: START and TARGET</Description>
                <Description>After the nodes have been generated, you can move them around (with drag and drop).</Description>
                <Description>By clicking on a random grid node, and keeping the mouse pressed, you can draw a wall.(an obstacle for the algorithm)</Description>
                <Description>Then, you can click Visualise, and the algorithm will compute and animate the shortest path from the start node, to the finish one.</Description>
            </Infos>   
        )
    }