import React, { Component } from 'react';

import '../styles/Node.css';

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isFinish,
      isStart,
      isWall,
      onMouseUp,
      onMouseDown,
      onMouseEnter,
    } = this.props;   

    return (
      <div
        id={`Node-${row}-${col}`}
        className={`Node ${isWall && 'Node-wall'}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        {isStart && <div id={'dragstart'}></div>}                               
        {isFinish && <div id={'dragtarget'}></div>}      
      </div>
    );
  }
}
