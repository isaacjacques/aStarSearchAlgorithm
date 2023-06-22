## A* Search Algorithm Demo
This repo contains javascript classes used to demo the [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm).
A* is a heuristic search algorithm that uses approximation to find an efficient path between two points.
This demo allows for users to select cells in a grid to create obstacles and find the shortest path between two corners of the grid while avoiding the obstacles.


## How to Use
The demo objects are intended for use with html elements.
Below is a snippit from the included [example](https://github.com/isaacjacques/aStarSearchAlgorithm/example.html)
```html
<html lang="en">
<head>
    <title>AStar Algorithm - PortfolioSite</title>
</head>
<body>
	<div class="demo">
		<canvas id="demo-grid" class="grid"></canvas>
		<textarea id="demo-log" class="log" rows="10" cols="64"></textarea>
		<button id="demo-control" class="control" type="button">Start</button>
	</div>
</body>
</html>
<script src="./astar.js" type="text/javascript"></script>
<script src="./grid.js" type="text/javascript"></script>
<script src="./gridcontrol.js" type="text/javascript"></script>
<script src="./gridpoint.js" type="text/javascript"></script>
<script src="./log.js" type="text/javascript"></script>
<script type="text/javascript"> 
	var log = new Log(document.getElementById('demo-log'));
	var grid = new Grid(document.getElementById('demo-grid'), 30, 30, log);
	var gridControl = new GridControl(document.getElementById('demo-control'), grid, findPathByAstar, log);

	grid.redraw();
	gridControl.ready();
</script>
```

## Technologies Used
JavaScript, HTML and CSS


## Authors
* **isaac jacques** - *Initial work* - [isaacjacques](https://github.com/isaacjacques)
 
 
## License
This project is licensed under the terms of the MIT license, see LICENSE.
