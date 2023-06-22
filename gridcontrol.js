
class GridControl {
    constructor(button, grid, demo, log) {
        this.button = button;
        this.currentState = DemoState.Initial;
        this.button.addEventListener("click", this.controlClickHandler.bind(this));
        this.grid = grid;
        this.demo = demo;
        this.log = log;
    }

    controlClickHandler(event) {
        switch (this.currentState) {
            case DemoState.Initial:
                break;
            case DemoState.Ready:
                this.currentState = DemoState.InProgress;
                this.button.innerText = "InProgress";
                this.#run();
                break;
            //case DemoState.InProgress:
            //    this.currentState = DemoState.Paused;
            //    this.button.innerText = "Continue";
            //    break;
            //case DemoState.Paused:
            //    this.currentState = DemoState.InProgress;
            //    this.button.innerText = "Pause";
            //    break;
            case DemoState.Complete:
                this.currentState = DemoState.Initial;
                this.button.innerText = "Restart";
                break;
            default:
                this.currentState = DemoState.Initial;
                this.button.innerText = "Error";
                break;
        }
    }

    ready() {
        this.log.add('Demo initialized.');
        this.log.add('Click on cells in the grid to make them into obstacles then hit start.');
        this.currentState = DemoState.Ready;
        this.button.innerText = "Start";
    }

    #run() {
        this.log.add('Starting demo...');
        this.demo(this.grid, this.log);
    }
}
const DemoState = {
    Initial: 0,
    Ready: 1,
    InProgress: 2,
    Paused: 3,
    Complete: 4
}
