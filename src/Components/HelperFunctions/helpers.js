
/* const START_NODE_ROW = -1;
const START_NODE_COL = -1;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export const getInitialGrid = () => {
    const heightApp = document.querySelector('.App').clientHeight;
    const heightNavbar = document.querySelector('.navbar').clientHeight;
    const height = heightApp - heightNavbar;
    const width = document.querySelector('.App').clientWidth;
    const numberOfRows = Math.floor(height / 40);
    const numberOfColumns = Math.floor(width / 40);

    const grid = [];
    for (let row = 0; row < numberOfRows - 1; row++) {
        const currentRow = [];
        for (let col = 0; col < numberOfColumns; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

export const createNode = (col, row) => {
    const { grid } = this.state;
    console.log(grid);
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

export const drawWall = (grid, row, col) => {
    const newGrid = grid.slice();
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    return newGrid;
};

export const drawTargetNode = (grid, row, col) => {
    const newGrid = grid.slice();
    newGrid[row][col].isFinish = true;
    return newGrid;
};
 */