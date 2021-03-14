import Node from "./Node";
import { dijkstra } from '../Algorithms/dijkstra';
import {aStar} from '../Algorithms/a_star';
import { bfs } from "../Algorithms/breadthFirstSearch";
import { dfs } from "../Algorithms/depthFirstSearch";
import { backtrackPath } from '../helpers/helpers.js';
import React, { Component } from 'react';
import { InfoTab } from './InfoTab';
import Navbar from './Navbar';
import {TimeTakenPanel} from './TimeTakenPanel'

import '../styles/Grid.css';
import SecondNavbar from "./SecondNavbar";

const nodeDimension = 35;

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
			startNodeIsBeingDragged: false,
			finishNodeIsBeingDragged: false,
			heuristicType: 'euclidean',
			allowDiagonal: true,
			timeTaken: 0,
			showInfos: true
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
			h: 0
		};
	};

	drawWall(grid, row, col) {
		if(grid[row][col].isWall) return grid;
		const newGrid = grid.slice();
		newGrid[row][col].isWall = !newGrid[row][col].isWall;
		return newGrid;
	};

	getInitialGrid() {
		const element = document.querySelector('.Grid');
		const height = element.clientHeight;
		const width = element.clientWidth;
		const numberOfRows = Math.floor(height / nodeDimension);
		const numberOfColumns = Math.floor(width / nodeDimension);
		const grid = [];

		for (let row = 0; row < numberOfRows; row++) {
			const currentRow = [];
			for (let col = 0; col < numberOfColumns; col++) {
				currentRow.push(this.createNode(col, row));
			}
			grid.push(currentRow);
		}

		const { startRow, startColumn, finishRow, finishColumn} = this.state;
		if(startRow === -1 || startColumn === -1 || finishRow === -1 || finishColumn === -1 ) {
			const startCoord = {
				x: Math.floor(numberOfRows/2),
				y: Math.floor(numberOfColumns/4),
			}
			const finishCoord = {
				x: Math.floor(numberOfRows/2),
				y: Math.floor(numberOfColumns*3/4)
			}
	
			grid[startCoord.x][startCoord.y].isStart = true;
			grid[finishCoord.x][finishCoord.y].isFinish = true;
	
			this.setState({
				startRow: startCoord.x,
				startColumn: startCoord.y,
				finishRow: finishCoord.x,
				finishColumn: finishCoord.y,
			})
		} else {
			this.setState({
				startRow,
				startColumn,
				finishRow,
				finishColumn,
			})
		}
		return grid;
	};

	handleMouseDown(row, col) {
		if (this.state.running) return;

		if (this.state.grid[row][col].isStart) {
			this.setState({mouseIsPressed: true, startNodeIsBeingDragged: true})
			return;
		}

		if (this.state.grid[row][col].isFinish) {
			this.setState({mouseIsPressed: true, finishNodeIsBeingDragged: true})
			return;
		}

		if (!this.state.finished) {
			const newGrid = this.drawWall(this.state.grid, row, col);
			this.setState({ grid: newGrid, mouseIsPressed: true });
		}
	}

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed || this.state.running) return;

		const { grid } = this.state;
		let { isFinish, isStart, isWall } = grid[row][col];

		if (!isFinish && !this.state.finished && !this.state.startNodeIsMoving && !isStart && !this.state.startNodeIsBeingDragged && !this.state.finishNodeIsBeingDragged) {
			const newGrid = this.drawWall(this.state.grid, row, col);
			this.setState({ grid: newGrid });
		}

		if(this.state.startNodeIsBeingDragged) {
			if(isWall) return;
			// Get the previous node from the grid, that still has isStart=true, and set it to false
			let previousStartNode = document.querySelector('#dragstart');
			if(previousStartNode) {
				const prevRow = parseInt(previousStartNode.parentNode.id.split('-')[1]);
				const prevCol = parseInt(previousStartNode.parentNode.id.split('-')[2]);
				if(grid[prevRow][prevCol].isStart)
					grid[prevRow][prevCol].isStart = false;
			}		
			grid[row][col].isStart = true;
			this.setState({grid, startColumn: col, startRow: row });
		}

		if(this.state.finishNodeIsBeingDragged) {
			if(isWall) return;
			// Get the previous node from the grid, that still has isFinish=true, and set it to false
			let previousFinishNode = document.querySelector('#dragtarget');
			if(previousFinishNode) {
				const prevRow = parseInt(previousFinishNode.parentNode.id.split('-')[1]);
				const prevCol = parseInt(previousFinishNode.parentNode.id.split('-')[2]);
				if(grid[prevRow][prevCol].isFinish)
					grid[prevRow][prevCol].isFinish = false;
			}
				
			grid[row][col].isFinish = true;
			this.setState({finishColumn: col, finishRow: row });

			// automatic recomputation
			if(this.state.finished) {
				if (grid[row][col].isWall) return;
				const startNode = grid[this.state.startRow][this.state.startColumn];
				const finishNode = grid[row][col];

				if(this.state.algorithm === 'Dijkstra') {
					const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
					const nodesInShortestPathOrder = backtrackPath(finishNode);
					this.onDragRecomputation(visitedNodesInOrder, nodesInShortestPathOrder);
				}

				if(this.state.algorithm === 'A*') {
					const visitedNodesInOrder = aStar(grid, startNode, finishNode, this.state.heuristicType, this.state.allowDiagonal)
					const nodesInShortestPathOrder = backtrackPath(finishNode);
					this.onDragRecomputation(visitedNodesInOrder, nodesInShortestPathOrder);
				}

				if(this.state.algorithm === 'BFS') {
					const visitedNodesInOrder = bfs(grid, startNode, finishNode, this.state.allowDiagonal)
					const nodesInShortestPathOrder = backtrackPath(finishNode);
					this.onDragRecomputation(visitedNodesInOrder, nodesInShortestPathOrder);
				}

				if(this.state.algorithm === 'DFS') {
					const visitedNodesInOrder = dfs(grid, startNode, finishNode, this.state.allowDiagonal)
					const nodesInShortestPathOrder = backtrackPath(finishNode);
					this.onDragRecomputation(visitedNodesInOrder, nodesInShortestPathOrder);
				}
			}
		}
	}

	handleMouseUp() {
		this.setState({ mouseIsPressed: false, startNodeIsBeingDragged: false, finishNodeIsBeingDragged: false });
	}

	onDragRecomputation(visitedNodesInOrder, nodesInShortestPathOrder) {		
		// Remove the class of visited nodes, and add it correctly 
		// Remove the class of shortest path nodes, and add it correctly 
		const visitedNodes = document.getElementsByClassName(`Node Node-visited`);
		const shortestPathNodes = document.getElementsByClassName(`Node Node-shortest-path`);

		for (let i=0; i<visitedNodes.length; i++)
			visitedNodes[i].classList.remove('Node-visited');
		for (let node of visitedNodesInOrder)
			document.getElementById(`Node-${node.row}-${node.col}`).className = 'Node Node-visited';
		for(let i=0; i<shortestPathNodes.length; i++) 
			shortestPathNodes[i].classList.remove('Node-shortest-path')
		for (let node of nodesInShortestPathOrder)
			document.getElementById(`Node-${node.row}-${node.col}`).className = 'Node Node-shortest-path';
	}

	calculatePath() {
		const {grid, startRow, startColumn, finishRow, finishColumn, algorithm} = this.state;
		const startNode = grid[startRow][startColumn];
		const finishNode = grid[finishRow][finishColumn];
		let start = 0;
		let finish = 0;
		let visitedNodesInOrder = [];
		this.setState({running:true})
		start = window.performance.now(); // Start measuring time

		switch(algorithm) {
			case 'Dijkstra':
				visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
			  	break;
			case 'A*':
				visitedNodesInOrder = aStar(grid, startNode, finishNode, this.state.heuristicType, this.state.allowDiagonal)
				break;
			case 'BFS':
				visitedNodesInOrder = bfs(grid, startNode, finishNode, this.state.allowDiagonal)
				break;
			case 'DFS':
				visitedNodesInOrder = dfs(grid, startNode, finishNode, this.state.allowDiagonal)
				break;
			default:
				console.log("Error");
				return;
		}

		finish = window.performance.now(); // Stop measuring time
		const nodesInShortestPathOrder = backtrackPath(finishNode);
		this.animateCurrentAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
		if(start && finish)	
			this.setState({timeTaken: finish-start})
	}

	visualizeCurrentAlgorithm() {
		if (this.state.running) {
			alert('Already running!'); 
			return;
		}

		if(this.state.finished) {
			this.resetAll(() => {
				this.calculatePath()
			})
			return;
		}

		this.setState({ running: true }, () => {
			if(this.state.startRow === -1 || this.state.startColumn === -1) return;
			this.calculatePath();
		}); 
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

	resetAll(callback) {
		if (this.state.running) {
			alert('Running!');
			return;
		}

		const { grid } = this.state;
		for(let row=0; row < grid.length; row++) {
			for(let col=0; col < grid[0].length; col++) {
				grid[row][col].distance = Infinity; 
				grid[row][col].isVisited = false; 
				grid[row][col].previousNode = null; 
				grid[row][col].f = 0; 
				grid[row][col].g = 0; 
				grid[row][col].h = 0; 
			}
		}

		this.setState({
			grid: grid,
			running: false,
			finished: false
		}, () => {
			const visitedNodes = document.querySelectorAll('.Node-visited')
			const shortestPathNodes = document.querySelectorAll('.Node-shortest-path')

			// Clear grid, but let walls
			for(let i=0; i< visitedNodes.length; i++ )
				visitedNodes[i].classList.remove('Node-visited');
			for(let i=0; i< shortestPathNodes.length; i++ )
				shortestPathNodes[i].classList.remove('Node-shortest-path')

			typeof callback == "function" && callback();
			return;
		});
	}

	clearWalls() {
		console.log('called')
		if (this.state.running) {
			alert('Running!');
			return;
		}

		const { grid } = this.state;
		for(let row=0; row < grid.length; row++) {
			for(let col=0; col < grid[0].length; col++) {
				grid[row][col].isWall = false; 
			}
		}
		this.setState({ grid });
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

	handleHideInfos() {
		this.setState({ showInfos: !this.state.showInfos })
	}

	render() {
		const { grid, mouseIsPressed, running, showInfos } = this.state;
		return (
			<div className="Wrapper">
				{showInfos &&
					<InfoTab 
						handleHideInfos={this.handleHideInfos.bind(this)}
					>
					</InfoTab>
				}
				<Navbar
					clearPath={this.resetAll.bind(this)}
					changeSpeed={this.handleChangeSpeed.bind(this)}
					runAlgorithm={this.visualizeCurrentAlgorithm.bind(this)}
					changeAlgorithm={this.handleChangeAlgorithm.bind(this)}
					handleChangeHeuristic={this.handleChangeHeuristic.bind(this)}
					handleChangeDiagonal={this.handleChangeDiagonal.bind(this)}
					clearWalls={this.clearWalls.bind(this)}
				/>
				<SecondNavbar />
				<TimeTakenPanel timeTaken={this.state.timeTaken} />
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

