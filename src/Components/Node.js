import React, { Component } from 'react';

import '../styles/Node.css';

export default class Node extends Component {
/*   constructor(props) {
    super(props);
    this.state={
      x: props.row,
      y: props.col,
      f: 0,
      g: 0,
      h: 0,
      neighbors: [],
      previous: undefined
    }
  }   */
  
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

    return (
      <div
        id={`Node-${row}-${col}`}
        className={`Node ${isWall && 'Node-wall'}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onDrop={(event) => onDrop(event, row, col)}
        onDragOver={(event) => onDragOver(event, row, col)}
        onDragStart={(event) => onDragStart(event, row, col)}
      >
        {isStart && <div draggable="true"
            id={'dragstart'}
            onDragStart={this.onDragStart}>
        </div>
        }

        {isFinish && <div draggable="true"
            id={'dragtarget'}
            onDragStart={this.onDragStart}>
        </div>
        }
      </div>
    );
  }
}
