import Node from "./Node";
import { dijkstra, backtrackDijkstra } from '../Algorithms/dijkstra';
import {aStar, backtrackAStar} from '../Algorithms/a_star';
import { BFS, backtrackBFS } from "../Algorithms/breadthFirstSearch";
import React, { Component } from 'react';
import Popup from './Popup';
import { InfoTab } from './InfoTab';
import Navbar from './Navbar';

import '../styles/Grid.css';
import SecondNavbar from "./SecondNavbar";

/* de verificat drag and drop : cand incerci sa muti un nod, dar il pui in locul de unde il iei, eroare... */


export default class Grid extends Component {
	constructor() {
		super();
		this.state = {
			grid: [],
			mouseIsPressed: false,
			running: false,
			animationSpeed: 25,
			algorithm: 'Dijkstra',
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
			finishNodeIsBeingDragged: false,
			heuristicType: 'euclidean',
			allowDiagonal: true,
			timeTaken: 0
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
			f: 0,
			g: 0,
			h: 0,
			parent: null
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
		const height = document.querySelector('.Grid').clientHeight;
		const width = document.querySelector('.Grid').clientWidth;
		const numberOfRows = Math.floor(height / 30);
		const numberOfColumns = Math.floor(width / 30);
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
		if (this.state.showPopup) this.setState({ showPopup: false });
		if (this.state.finished && !this.state.running) {
			this.resetAll(() => {
				this.generateRandomStart();
			});
			return;
		}

		if (this.state.running) {
			alert('The program is already running. You cannot generate a random start node until execution finishes!');
			return;
		}
		this.generateRandomStart();
	}

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
		if (this.state.startNodeIsBeingDragged) {
			let data = event.dataTransfer.getData("Start");
			event.target.appendChild(document.getElementById(data));
			this.setState({ mouseIsPressed: false, startRow: row, startColumn: col, startNodeIsBeingDragged: false });
			return;
		}
		if (this.state.finishNodeIsBeingDragged) {
			let data = event.dataTransfer.getData("Finish");
			event.target.appendChild(document.getElementById(data));
			this.setState({ mouseIsPressed: false, finishRow: row, finishColumn: col, finishtNodeIsBeingDragged: false });
			return;
		}
	}

	DropOverHandler(event, row, col) {
		event.preventDefault();
	}

	handleMouseDown(row, col) {
		if (this.state.running || this.state.grid[row][col].isStart) return;

		if (!this.state.grid[row][col].isFinish && !this.state.finished) {
			const newGrid = this.drawWall(this.state.grid, row, col);
			this.setState({ grid: newGrid, mouseIsPressed: true });
		}
	}


	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed || this.state.running) return;

		const { grid } = this.state;
		let { isFinish, isStart, isWall } = grid[row][col];

		if (!isFinish && !this.state.finished && !this.state.startNodeIsMoving && !isStart) {
			const newGrid = this.drawWall(this.state.grid, row, col);
			this.setState({ grid: newGrid });
		}
	}

	handleMouseUp() {
		this.setState({ mouseIsPressed: false });/* , startNodeIsMoving: false */
	}

	realTimeComputingDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {		/* Compute the shorthest-path in when dragging the target node */
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

	visualizeCurrentAlgorithm() {
		let start = window.performance.now();
		if (this.state.running) {
			alert('Already running!');
			return;
		}
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

				if(this.state.algorithm === 'Dijkstra') {
					const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
					const nodesInShortestPathOrder = backtrackDijkstra(finishNode);
					this.animateCurrentAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
				}

				if(this.state.algorithm === 'A*') {
					const visitedNodesInOrder = aStar(grid, startNode, finishNode, this.state.heuristicType, this.state.allowDiagonal)
					const nodesInShortestPathOrder = backtrackAStar(finishNode);
					this.animateCurrentAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
				}

				if(this.state.algorithm === 'BFS') {
					const visitedNodesInOrder = BFS(grid, startNode, finishNode, this.state.allowDiagonal)
					const nodesInShortestPathOrder = backtrackBFS(finishNode);
					this.animateCurrentAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
				}
				/* Add More */
				
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

		/* If you click the "Visualize" button, but there is no finishNode */
		if (this.state.finishRow === -1 && this.state.finishColumn === -1) {
			this.setState({
				popupHeader: "Not found",
				popupDescription: "The starting node and the finish one were not generated. In order to vizualize the path found by the algorithm, please generate them.",
				popupButton: "Generate now!"
			}, () => {
				this.togglePopup();
			});
		}

		let finish = window.performance.now();
		let timeTaken = finish-start;
		this.setState({timeTaken: timeTaken})
	}

	animateCurrentAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
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

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	runAgain() {
		const { startRow, startColumn, finishRow, finishColumn } = this.state;
		this.resetAll();
		
		this.setState({
			startRow: startRow,
			startColumn: startColumn,
			finishRow: finishRow,
			finishColumn: finishColumn,
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

	handleChangeSpeed(speed) {
		this.setState({ animationSpeed: speed });
	}

	handleChangeAlgorithm(name) {
		this.setState({ algorithm: name });
	}

	handleChangeHeuristic(heuristic) {
		this.setState({heuristicType : heuristic})
	}

	handleChangeDiagonal(val) {
		this.setState({ allowDiagonal: val})
	}

	render() {
		const { grid, mouseIsPressed, running } = this.state;
		return (
			<div className="Wrapper">
				{/* <InfoTab></InfoTab> */}
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
					runAlgorithm={this.visualizeCurrentAlgorithm.bind(this)}
					changeAlgorithm={this.handleChangeAlgorithm.bind(this)}
					setRandomStart={this.setRandomStart.bind(this)}
					setRandomFinish={this.generateRandomFinish.bind(this)}
				/>
				<SecondNavbar 
					handleChangeHeuristic={this.handleChangeHeuristic.bind(this)}
					handleChangeDiagonal={this.handleChangeDiagonal.bind(this)}
					timeTaken={this.state.timeTaken}
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

