import Node from "../Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from '../../Algorithms/dijkstra';
import React, { Component } from 'react';
import Popup from '../Popup/Popup';
import { InfoTab } from '../InfoTab/InfoTab';
import Navbar from '../Navbar/Navbar';

import './DijkstraPath.css';

export default class DijkstraPath extends Component {
	constructor() {
		super();
		this.state = {
			grid: [],
			mouseIsPressed: false,
			running: false,
			animationSpeed: 25,
			finished: false,
			startRow: -1,
			startColumn: -1,
			finishRow: -1,
			finishColumn: -1,
			showPopup: false,
			popupHeader: '',
			popupDescription: '',
			popupButton: '',
			runAgain: false,
			startNodeIsBeingDragged: false,
			finishNodeIsBeingDragged: false
		  };
	}

	componentDidMount() {
		this.setState({ grid: this.getInitialGrid() });
	}

	createNode(col, row) {
		return {
			col,
			row,
			isStart: row === this.state.startRow && col === this.state.startColumn,
			isFinish: row === this.state.finishRow && col === this.state.finishColumn,
			distance: Infinity,
			isVisited: false,
			isWall: false,
			previousNode: null,
		};
	};

	drawWall(grid, row, col) {
		const newGrid = grid.slice();
		newGrid[row][col].isWall = !newGrid[row][col].isWall;
		return newGrid;
	};

	drawTargetNode(grid, row, col) {
		const newGrid = grid.slice();
		newGrid[row][col].isFinish = true;
		return newGrid;
	};

	getInitialGrid() {
		const heightApp = document.querySelector('.App').clientHeight;
		const heightNavbar = document.querySelector('.Navbar').clientHeight;
		const height = heightApp - heightNavbar;
		const width = document.querySelector('.App').clientWidth;
		/* const height = document.querySelector('.Wrapper').clientHeight; 
		const width = document.querySelector('.Wrapper').clientWidth; */

		const numberOfRows = Math.floor(height / 40);
		const numberOfColumns = Math.floor(width / 40);
		const grid = [];
		for (let row = 0; row < numberOfRows; row++) {
			const currentRow = [];
			for (let col = 0; col < numberOfColumns; col++) {
				currentRow.push(this.createNode(col, row));
			}
			grid.push(currentRow);
		}
		return grid;
	};

	initiateNodes() {
		this.setRandomStart();
		this.generateRandomFinish();
	}

	generateRandomFinish() {
		const { grid, finishRow, finishColumn } = this.state;
		const numberOfRows = grid.length;
		const numberOfColumns = grid[0].length;
		let randomRow;
		let randomColumn;

		if (finishRow > -1 && finishColumn > -1)
			for (let finishNode of document.querySelectorAll('#dragfinish'))
				finishNode.remove();

		do {
			randomRow = Math.floor((Math.random() * numberOfRows));
			randomColumn = Math.floor((Math.random() * numberOfColumns));
		} while (grid[randomRow][randomColumn].isWall || grid[randomRow][randomColumn].isStart);

		grid[randomRow][randomColumn].isFinish = true;
		this.setState({ grid: grid, finishRow: randomRow, finishColumn: randomColumn });
	}

	generateRandomStart() {
		const { grid, startRow, startColumn } = this.state;
		const numberOfRows = grid.length;
		const numberOfColumns = grid[0].length;
		let randomRow;
		let randomColumn;

		if (startRow > -1 && startColumn > -1)
			for (let startNode of document.querySelectorAll('#dragstart'))
				startNode.remove();

		do {
			randomRow = Math.floor((Math.random() * numberOfRows));
			randomColumn = Math.floor((Math.random() * numberOfColumns));
		} while (grid[randomRow][randomColumn].isWall || grid[randomRow][randomColumn].isFinish);

		grid[randomRow][randomColumn].isStart = true;
		this.setState({ grid: grid, startRow: randomRow, startColumn: randomColumn });
	}

	setRandomStart() {
		/* if you clicked the "Generate now!" button from popup, the popup will be closed, and there will be generated a random node*/
		if (this.state.showPopup)
			this.setState({ showPopup: false });
		/* If you want to generate a random startNode, but after the visualisation has ended */
		if (this.state.finished && !this.state.running) {
			this.resetAll(() => {
				this.generateRandomStart();
			});
			return;
		}
		/* If visualisation is still executing, show a popup */
		if (this.state.running) {
			alert('The program is already running. You cannot generate a random start node until execution finishes!');
			return;
		}
		this.generateRandomStart();
	}

	/* Drag and drop handlers for start node */
	dragHandler(event, row, col) {
		const { grid } = this.state;
		if (grid[row][col].isWall) return;

		if (grid[row][col].isStart) {
			event.dataTransfer.setData("Start", event.target.id);
			this.setState({
				startNodeIsBeingDragged: true
			});
			return;
		}
		if (grid[row][col].isFinish) {
			event.dataTransfer.setData("Finish", event.target.id);
			this.setState({
				finishNodeIsBeingDragged: true
			});
		}
	}

	DropHandler(event, row, col) {
		event.preventDefault();
		/* const {grid} = this.state; */

		if (this.state.startNodeIsBeingDragged) {
			let data = event.dataTransfer.getData("Start");
			event.target.appendChild(document.getElementById(data));
			this.setState({ mouseIsPressed: false, startRow: row, startColumn: col, startNodeIsBeingDragged: false });
			return;
		}
		if (this.state.finishNodeIsBeingDragged && !this.state.finished) {
			let data = event.dataTransfer.getData("Finish");
			event.target.appendChild(document.getElementById(data));
			this.setState({ mouseIsPressed: false, finishRow: row, finishColumn: col, finishtNodeIsBeingDragged: false });
			return;
		}


		/* if (this.state.finished && this.state.finishNodeIsBeingDragged) {
			if (grid[row][col].isWall) return;
			const startNode = grid[this.state.startRow][this.state.startColumn];
			const finishNode = grid[row][col];
			const newGrid = this.drawTargetNode(grid, row, col);
			this.setState({ grid: newGrid }, () => {
				const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
				const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
				this.realTimeComputingDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
			});
		} */

		/* if (this.state.finished && this.state.finishNodeIsBeingDragged) {
			const {grid} = this.state.grid;
			if (grid[row][col].isWall) return;
			const startNode = grid[row][col];
			const finishNode = grid[row][col];
			const newGrid = this.drawTargetNode(grid, row, col);
			this.setState({ grid: newGrid }, () => {
				const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
				const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
				this.realTimeComputingDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
			});
		} */
	}

	DropOverHandler(event, row, col) {
		event.preventDefault();
	}
	/* End Drag and drop handlers for start node */

	handleMouseDown(row, col) {
		if (this.state.running || this.state.grid[row][col].isStart) return;

		const node = this.state.grid[row][col];
		let { isFinish } = node;

		/* if (isFinish && this.state.finished) {
			const newGrid = this.state.grid.slice();
			newGrid[row][col].isFinish = false;	
			this.setState({ mouseIsPressed: true, grid: newGrid });
		} */

		if (!isFinish && !this.state.finished) {
			const newGrid = this.drawWall(this.state.grid, row, col);
			this.setState({ grid: newGrid, mouseIsPressed: true });
		}
	}

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed || this.state.running) return;

		const { grid } = this.state;
		let { isFinish, isStart, isWall } = grid[row][col];

		/* If the mouse enters an ordinary node and start node isn't moving, then we want to draw a wall */
		if (!isFinish && !this.state.finished && !this.state.startNodeIsMoving && !isStart) {
			const newGrid = this.drawWall(this.state.grid, row, col);
			this.setState({ grid: newGrid });
		}

		/* if (this.state.finished) {
			if (isWall) return;
			const startNode = grid[this.state.startRow][this.state.startColumn];
			const finishNode = grid[row][col];
			const newGrid = this.drawTargetNode(grid, row, col);
			this.setState({ grid: newGrid }, () => {
				const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
				const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
				this.realTimeComputingDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
			});
		} */
	}

	handleMouseUp() {
		this.setState({ mouseIsPressed: false });/* , startNodeIsMoving: false */
	}

	realTimeComputingDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {		/* Compute the shorthest-path in real time when dragging the target node */
		for (let node of document.getElementsByClassName(`Node Node-visited`))		/* Remove the class of visited nodes, and add it correctly */
			node.classList.remove('Node-visited');
		for (let node of visitedNodesInOrder)
			document.getElementById(`Node-${node.row}-${node.col}`).className = 'Node Node-visited';
		this.computeShortestPath(nodesInShortestPathOrder);
	}

	computeShortestPath(nodesInShortestPathOrder) {
		for (let node of document.getElementsByClassName(`Node Node-shortest-path`)) 		/* Remove the class of shortest path nodes, and add it correctly */
			node.classList.remove('Node-shortest-path');

		for (let node of nodesInShortestPathOrder)
			document.getElementById(`Node-${node.row}-${node.col}`).className = 'Node Node-shortest-path';
	}

	animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					this.animateShortestPath(nodesInShortestPathOrder);
				}, this.state.animationSpeed / 5 * i);
				return;
			}
			setTimeout(() => {
				const node = visitedNodesInOrder[i];
				let element = document.getElementById(`Node-${node.row}-${node.col}`);
				element.className = 'Node Node-visited';
				element.style.animationDuration = `${this.state.animationSpeed / 33.3}s`;
			}, this.state.animationSpeed / 5 * i);
		}
	}

	async animateShortestPath(nodesInShortestPathOrder) {
		for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
			setTimeout(() => {
				const node = nodesInShortestPathOrder[i];
				let element = document.getElementById(`Node-${node.row}-${node.col}`);
				element.className = 'Node Node-shortest-path';
				element.style.animationDuration = `${this.state.animationSpeed / 33.3}s`;
			}, this.state.animationSpeed * i);
		}
		await this.setState({
			running: false,
			finished: true
		});
	}

	visualizeDijkstra() {
		if (this.state.running) {
			alert('Already running!');
			return;
		}
		/* If you click twice in a row on the "Visualize" button */
		if (this.state.finished || this.state.running) {
			this.setState({
				popupHeader: "Clear all?",
				popupDescription: "The previous path is still drawn. Do you want to clear it and see the new one?",
				popupButton: "Clear it!",
				runAgain: true
			}, () => {
				this.togglePopup();
			});
			return;
		}

		/* If you click the "Visualize" button, but there is no startNode */
		if (this.state.startRow !== -1 && this.state.startColumn !== -1) {
			this.setState({ running: true }, () => {
				const { grid } = this.state;
				const startNode = grid[this.state.startRow][this.state.startColumn];
				const finishNode = grid[this.state.finishRow][this.state.finishColumn];
				const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
				const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
				this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
			});
		} else {
			this.setState({
				popupHeader: "Not found",
				popupDescription: "The starting node and the finish one were not generated. In order to vizualize the path found by the algorithm, please generate them.",
				popupButton: "Generate now!"
			}, () => {
				this.togglePopup();
			});
		}
	}

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	runAgain() {
		const { startRow, startColumn } = this.state;

		this.resetAll();
		this.setState({
			startRow: startRow,
			startColumn: startColumn,
			runAgain: !this.state.runAgain,
			showPopup: !this.state.showPopup
		});
	}

	resetAll(callback) {
		if (this.state.running) {
			alert('Running!');
			return;
		}
		this.setState({
			grid: [],
			startRow: -1,
			startColumn: -1,
			finishRow: -1,
			finishColumn: -1,
			runAgain: false
		}, () => {
			const grid = this.getInitialGrid();
			this.setState({
				grid: grid,
				running: false,
				finished: false
			}, () => {
				typeof callback == "function" && callback();
			});
		});
	}

	async handleChangeSpeed(speed) {
		await this.setState({ animationSpeed: speed });
	}

	async handleChangeAlgorithm(name) {
		await console.log('Algorithm changed: ' + name);
	}

	render() {
		const { grid, mouseIsPressed, running } = this.state;
		return (
			<div className="Wrapper">
				<InfoTab></InfoTab>
				{this.state.showPopup &&
					<Popup
						header={this.state.popupHeader}
						description={this.state.popupDescription}
						buttonText={this.state.popupButton}
						closePopup={() => this.togglePopup()}
						handleButtonClick={
							!this.state.runAgain
								? this.initiateNodes.bind(this)
								: this.runAgain.bind(this)}
					/>
				}
				<Navbar
					clearPath={this.resetAll.bind(this)}
					changeSpeed={this.handleChangeSpeed.bind(this)}
					runAlgorithm={this.visualizeDijkstra.bind(this)}
					changeAlgorithm={this.handleChangeAlgorithm.bind(this)}
					setRandomStart={this.setRandomStart.bind(this)}
					setRandomFinish={this.generateRandomFinish.bind(this)}
				/>
				<div className="Grid">
					{grid.map((row, rowIndex) => {
						return (
							<div key={rowIndex}>
								{row.map((node, nodeIndex) => {
									const { row, col, isFinish, isStart, isWall } = node;
									return (
										<Node
											key={nodeIndex}
											row={row}
											col={col}
											isFinish={isFinish}
											isStart={isStart}
											isWall={isWall}
											isComputing={running}
											mouseIsPressed={mouseIsPressed}
											onMouseDown={(row, col) => this.handleMouseDown(row, col)}
											onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
											onMouseUp={() => this.handleMouseUp()}
											onDragOver={(event, row, col) => this.DropOverHandler(event, row, col)}
											onDrop={(event, row, col) => this.DropHandler(event, row, col)}
											onDragStart={(event, row, col) => this.dragHandler(event, row, col)}
										>
										</Node>
									);
								})}
							</div>
						);
					})}
				</div>
			</div >
		);
	}
}

