// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.


import { getNeighbors } from '../helpers/helpers.js'

export function bfs(grid, startNode, finishNode, allowDiagonal) {
    let queue = [startNode];
    let visitedNodesInOrder = [];

    while (queue.length) {
       let currentNode = queue.shift();
       visitedNodesInOrder.push(currentNode);

       if(currentNode === finishNode) return visitedNodesInOrder;

       if (!currentNode.isWall && (currentNode.isStart || !currentNode.isVisited)) {
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);
       
            let neighbors = getNeighbors(currentNode, grid, false)

            neighbors
            .forEach(neighbor => {
                if(!neighbor.isVisited && !neighbor.isWall) {
                    neighbor.previousNode = currentNode;
                    queue.push(neighbor);
                }
            });
        }
    }

    // No path found
    return []
 }

