# Pathfinding Algorithm Visualiser

## Click [here](https://costingh.github.io/deploy-pathfinding-visualiser/) for a live demo of this app!

![Demo Image](https://github.com/costingh/Pathfinding-Algorithm-Visualiser/blob/master/demo-img.png?raw=true)

### Description

This is a tool built using react, that allows visualising the path between two nodes, found with the help of a choosen algorithm.

### Algorithms implemented

## 1. Dijkstra

Dijkstra’s Algorithm lets us prioritize which paths to explore. Instead of exploring all possible paths equally, it favors lower cost paths.
We can assign lower cost to encourage moving on roads while assigning high cost on highway to avoid them.
It is the algorithm of choice for finding the shortest paths with multiple destinations.

## 2. A*

A* is a modification of Dijkstra’s Algorithm that is optimized for a single destination.
Dijkstra’s Algorithm can find paths to all locations; A* finds paths to one location. It prioritizes paths that seem to be leading closer to a goal.
In a game, we could set costs to be attracted or discouraged in going near some objects : how useful it is for an AI.
It is more or less the golden ticket or industry standard algorithm for all applications finding directions between two locations.
It can be performed using different type of heuristics (only manhattan, euclidian, diagonal are implemented).

## 3. Bredth First Search

Breadth First Search explores equally in all directions.
This is an incredibly useful algorithm, not only for regular traversal, but also for procedural map generation, flow field pathfinding, distance maps, and other types of map analysis.
This may be the algorithm of choice to identify nearby places of interest in GPS.
BFS guarantees the shortest path.

## 4. Depth First Search

Traverses by exploring as far as possible down each path before backtracking.
As useful as the BFS: DFS can be used to generate a topological ordering, to generate mazes, to traverse trees, to build decision trees, to discover a solution path with hierarchical choices.
DFS does not guarantee the shortest path.

### Functionality
At first on the grid there are two nodes drawn (start and finish). You cand draw obstacles, such like walls, and then choose the algorithm that you want to visualise. After clicking visualise, the algorithm will compute the path from start to finish node, and then you will see the animation.

### Tech Stack
* HTML
* CSS
* React
* Javascript
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-r
