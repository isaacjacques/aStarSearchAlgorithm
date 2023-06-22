class Grid {
    constructor(canvas, columns, rows, log) {
        this.canvas = canvas;
        this.columns = columns;
        this.rows = rows;
        this.context = this.canvas.getContext('2d');
        this.cells = new Array(this.columns);
        this.canvas.addEventListener("click", this.selectionHandler.bind(this));
        this.log = log;
    }

    get styleWidth() {
        return +getComputedStyle(this.canvas).getPropertyValue('width').slice(0, -2);
    }
    get styleHeight() {
        return +getComputedStyle(this.canvas).getPropertyValue('height').slice(0, -2);
    }
    get cellWidth() {
        return this.canvas.width / this.columns;
    }
    get cellHeight() {
        return this.canvas.height / this.rows;
    }

    redraw() {
        this.canvas.setAttribute('width', this.styleWidth * window.devicePixelRatio);
        this.canvas.setAttribute('height', this.styleHeight * window.devicePixelRatio);

        this.context.lineWidth = 1;
        this.context.strokeStyle = 'black';
        this.context.fillStyle = 'white';
        var width = this.cellWidth;
        var height = this.cellHeight;

        //
        // Iterate over each cell drawing its rectangle and adding it to the 'grid' array if it doesnt exist already
        // After creating the cells, iterate again adding references to neighboring cells
        //
        for (let iColumn = 0; iColumn < this.columns; iColumn++) {

            if (this.cells[iColumn] === undefined) {
                this.cells[iColumn] = new Array(this.rows);
            }

            for (let iRow = 0; iRow < this.rows; iRow++) {

                this.context.beginPath();
                this.context.fillRect(iColumn * width, iRow * height, width, height);
                this.context.strokeRect(iColumn * width, iRow * height, width, height);

                if (this.cells[iColumn][iRow] === undefined) {
                    this.cells[iColumn][iRow] = new GridPoint(iColumn, iRow);
                }
            }
        }

        for (let iColumn = 0; iColumn < this.columns; iColumn++) {
            for (let iRow = 0; iRow < this.rows; iRow++) {
                this.cells[iColumn][iRow].addNeighbors(this.cells);
            }
        }
    }

    selectionHandler(event) {
        var gridRect = event.target.getBoundingClientRect();

        var scaleX = event.target.width / gridRect.width;
        var scaleY = event.target.height / gridRect.height;

        var x = Math.floor((event.clientX - gridRect.left) * scaleX);
        var y = Math.floor((event.clientY - gridRect.top) * scaleY);

        if (x >= 0 && x < event.target.width && y >= 0 && y < event.target.height) {
            var width = this.cellWidth;
            var height = this.cellHeight;
            var column = Math.floor(x / width);
            var row = Math.floor(y / height);

            if (this.cells[column] && this.cells[column][row]) {
                if (!this.cells[column][row].isObstacle) {
                    this.log.add('Obstacle created at column: ' + column + ' row: ' + row);
                    this.cells[column][row].isObstacle = true;
                    this.cells[column][row].show(this, 'black');
                }
            }
        }
    }
}