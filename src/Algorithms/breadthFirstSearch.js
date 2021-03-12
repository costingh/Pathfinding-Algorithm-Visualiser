import { getNeighbors } from '../helpers/helpers.js'

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

