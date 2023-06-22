
class Log {
    constructor(element){
        this.element = element;
    }

    add(message){
        this.element.value += message + '\n';
        this.element.scrollTop = this.element.scrollHeight;
    }
}