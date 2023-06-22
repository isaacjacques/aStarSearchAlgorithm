function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function findPathByAstar(grid, log) {
    //https://en.wikipedia.org/wiki/A*_search_algorithm
    var start = grid.cells[0][0];
    var end = grid.cells[29][29];
    var openSet = [];
    var closedSet = [];
    var path = [];

    openSet.push(start);
    start.show(grid, 'blue');
    end.show(grid, 'blue');

    while (true) {

        if (openSet.length > 0) {
            var shortestPath = 0;
            for (var i = 0; i < openSet.length; i++) {
                if (openSet[i] < shortestPath) {
                    shortestPath = i;
                }
            }

            var current = openSet[shortestPath];
            if (current === end) {
                log.add('Done.');
                path = [];
                var temp = current;
                while (temp.previous) {
                    path.push(temp.previous);
                    temp = temp.previous;
                    if (temp != start) {
                        temp.show(grid, 'yellow');
                    }
                }
                break;
            }
            else {
                // Remove position from openSet
                for (var i = openSet.length - 1; i >= 0; i--) {
                    if (openSet[i] == current) {
                        openSet.splice(i, 1);
                    }
                }
                closedSet.push(current);
                if (current != start) {
                    current.show(grid, 'red');
                }

                for (var i = 0; i < current.neighbors.length; i++) {
                    var neighbor = current.neighbors[i];

                    if (!closedSet.includes(neighbor) && !neighbor.isObstacle) {
                        var tempG = current.g + 1;

                        if (openSet.includes(neighbor)) {
                            if (tempG < neighbor.g) {
                                neighbor.g = tempG;
                            }
                        }
                        else {
                            neighbor.g = tempG;
                            openSet.push(neighbor);
                            if (neighbor != end) {
                                neighbor.show(grid, 'green');
                            }
                        }

                        neighbor.h = getDistance(neighbor.column, end.column, neighbor.row, end.row);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = current;
                    }
                }
            }
        }
        else {
            log.add('No solution found.');
            break;
        }

        await delay(4);
    }
}

function getDistance(x1, x2, y1, y2) {
    // pythagorean theorem
    var a = x2 - x1;
    var b = y2 - y1;
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return c;
}