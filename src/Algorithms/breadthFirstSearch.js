
export function BFS(grid, startNode, finishNode, allowDiagonal) {
    let queue = [];
    let explored = [];
    let nodesToAnimate = [];

    queue.push(startNode);
    explored.push(startNode);

    while (queue.length) {
       let currentNode = queue.shift();
       nodesToAnimate.push(currentNode);

       if(currentNode === finishNode) {
           return nodesToAnimate;
       }

       let neighbors = getNeighbors(currentNode, grid, allowDiagonal)

       neighbors
       .filter(neighbor => !explored.includes(neighbor))
       .forEach(neighbor => {
            if(!neighbor.isWall) {
                explored.push(neighbor);
                queue.push(neighbor);
                neighbor.previousNode = currentNode;
            }
       });
    }
    return []
 }


 function getNeighbors(node, grid, allowDiagonal) {
    let neighbors = [];
    let x = node.row;
    let y = node.col;

    // West
    if(grid[x-1] && grid[x-1][y]) {
        neighbors.push(grid[x-1][y]);
    }

    // East
    if(grid[x+1] && grid[x+1][y]) {
        neighbors.push(grid[x+1][y]);
    }

    // South
    if(grid[x][y-1] && grid[x][y-1]) {
        neighbors.push(grid[x][y-1]);
    }

    // North
    if(grid[x][y+1] && grid[x][y+1]) {
        neighbors.push(grid[x][y+1]);
    }

    if(allowDiagonal) {
        // Southwest
        if(grid[x-1] && grid[x-1][y-1]) {
            neighbors.push(grid[x-1][y-1]);
        }

        // Southeast
        if(grid[x+1] && grid[x+1][y-1]) {
            neighbors.push(grid[x+1][y-1]);
        }

        // Northwest
        if(grid[x-1] && grid[x-1][y+1]) {
            neighbors.push(grid[x-1][y+1]);
        }

        // Northeast
        if(grid[x+1] && grid[x+1][y+1]) {
            neighbors.push(grid[x+1][y+1]);
        } 
    }

    return neighbors;
}

export function backtrackBFS(finishNodeNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNodeNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}


