import { getNeighbors } from '../helpers/helpers.js'

export function DFS(grid, startNode, finishNode, allowDiagonal) {
    let stack = []; 
    let explored = [];
    let nodesToAnimate = [];

    // Add the startNode in stack
    // Mark the first node as explored
    stack.push(startNode);
    explored.push(startNode);
 
    // We'll continue till our Stack gets empty
    while (stack.length) {
       let currentNode = stack.pop();
       nodesToAnimate.push(currentNode);

        // Stop if the currentNode is the target
        if(currentNode === finishNode) {
            return nodesToAnimate;
        }
 
        // 1. In the neighbours array, we stored nodes this node is directly connected to.
        // 2. We filter out the nodes that have already been explored.
        // 3. Then we mark each unexplored node as explored and push it to the Stack.
        let neighbors = getNeighbors(currentNode, grid, false)
        neighbors
        .filter(neighbor => !explored.includes(neighbor))
        .forEach(neighbor => {
            if(!neighbor.isWall) {
                explored.push(neighbor);
                stack.push(neighbor);
                neighbor.previousNode = currentNode;
            }
        });
    }
    // Target not found
    return []
 }
