class GridPoint {
    constructor(column, row) {
        this.column = column;
        this.row = row;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.vh = 0;
        this.neighbors = [];
        this.previous;
        this.isObstacle = false;
    }

    show(grid, fillColor = 'grey') {
        grid.context.lineWidth = 1;
        grid.context.strokeStyle = 'black';
        grid.context.fillStyle = fillColor;
        grid.context.beginPath();
        grid.context.fillRect(this.column * grid.cellWidth, this.row * grid.cellHeight, grid.cellWidth, grid.cellHeight);
        grid.context.strokeRect(this.column * grid.cellWidth, this.row * grid.cellHeight, grid.cellWidth, grid.cellHeight);
    }

    addNeighbors(gridPoints) {
        //
        // Here we add references to at most 4 neighboring gridPoints with 'edge' gridPoints having less neighbors
        //
        if (this.column > 0) { // Neighbor to the left?
            this.neighbors.push(gridPoints[this.column - 1][this.row]);
        }
        if (this.column + 1 < gridPoints.length) { // Neighbor to the right?
            this.neighbors.push(gridPoints[this.column + 1][this.row]);
        }
        if (this.row > 0) { // Neighbor above?
            this.neighbors.push(gridPoints[this.column][this.row - 1]);
        }
        if (this.row + 1 < gridPoints[this.column].length) { // Neighbor below?
            this.neighbors.push(gridPoints[this.column][this.row + 1]);
        }
    }
}