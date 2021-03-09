import React, { Component } from 'react';
/* import DraggableNode from '../Node/DraggableNode'; */

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onDrop,
      onDragOver,
      onDragStart,
      row,
    } = this.props;
    const NodeType = isWall && 'Node-wall';

    return (
      <div
        id={`Node-${row}-${col}`}
        className={`Node ${NodeType}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onDrop={(event) => onDrop(event, row, col)}
        onDragOver={(event) => onDragOver(event, row, col)}
        onDragStart={(event) => onDragStart(event, row, col)}
      >
        {isStart
          &&
          <div draggable="true"
            id="dragstart"
            onDragStart={this.onDragStart}></div>
        }


        {isFinish
          &&
          <div draggable="true"
            id="dragtarget"
            onDragStart={this.onDragStart}></div>
        }


      </div>
    );
  }
}

/* onDrop={(event) => this.handleDrop(event)}
          onDragOver={(event) => this.handleDropOver(event)} */