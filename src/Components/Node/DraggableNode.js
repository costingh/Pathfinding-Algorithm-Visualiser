import React from 'react'

import './DraggableNode.css';


function DraggableNode(props) {



    /* id="dragtarget"
                onDragStart={(event) => props.handleDragStart(event)} */

    return (
        <div
            id="dragtarget"
            onDrop={(event) => props.onDrop(event)}
            onDragOver={(event) => props.onDragOver(event)}
            onDragStart={(event) => props.onDragStart(event)}
            draggable='true'
        >

        </div>
    );
}

export default DraggableNode;
