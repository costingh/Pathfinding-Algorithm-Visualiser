import { getNeighbors } from '../helpers/helpers.js'

function heuristic(nodeA, nodeB, heuristicType) {

    // Manhattan distance
    if(heuristicType === 'manhattan') {
        let d1 = Math.abs(nodeB.row - nodeA.row);
        let d2 = Math.abs(nodeB.col - nodeA.col);
        return d1+d2;
    }

    /* Euclidean distance */
    if(heuristicType === 'euclidean') {
        let d1 = Math.pow(nodeB.row - nodeA.row,2);
        let d2 = Math.pow(nodeB.col - nodeA.col,2);
        return d1+d2;
    }
    
    /* Diagonal distance */
    if(heuristicType === 'diagonal') {
        let d1 = Math.abs(nodeB.row - nodeA.row);
        let d2 = Math.abs(nodeB.col - nodeA.col);
        return Math.max(d1,d2) + (Math.sqrt(2)-1) * Math.min(d1,d2);
    }
}

export function aStar(grid, startNode, finishNode, heuristicType, allowDiagonal) {
    let openList = [];
    const closedList = []
    let visitedNodes  = []

    openList.push(startNode)

    while (openList.length) {
        let lowInd = 0;
        for(let i=0; i<openList.length; i++) {
            if(openList[i].f < openList[lowInd].f) {
                lowInd = i;
            }
        }

        let currentNode = openList[lowInd]
        visitedNodes.push(currentNode)

        // The target node has been reached, return the visited nodes
        if(currentNode === finishNode) {
            return visitedNodes;
        }

        // Move current Node from open to closed list, and process each of its neighbors
        openList = openList.filter((node) => { return node !== currentNode})

        closedList.push(currentNode);
        let neighbors = getNeighbors(currentNode, grid, allowDiagonal);

        for(let i=0; i<neighbors.length; i++) {
            let neighbor = neighbors[i];
            if(closedList.includes(neighbor) || neighbor.isWall) {
                continue; // not a valid node, skip to next neighbor
            }

            // gScore is the shortest distance from start to current node,
            // we need to check if the path we have arrived at this 
            //neighbor is the shortest one we have seen yet
            let gScore = currentNode.g + 1;
            let gScoreIsBest = false;

            if(!openList.includes(neighbor)) {
                // the first time we visit this node, that means that it is the best
                // Moreover, we need to get the heuristic score (h)
                gScoreIsBest = true;
                neighbor.h = heuristic(neighbor, finishNode, heuristicType);
                openList.push(neighbor);
            } else if(gScore < neighbor.g) {
                gScoreIsBest = true;
            }

            if(gScoreIsBest) {
                // an potimal path was found
                // update previousNode, f, and g score
                neighbor.previousNode = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                visitedNodes.push(neighbor);
            }
        }
    }

    // Path not found
    return [];
}
