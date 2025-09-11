class Queue {
    constructor() {
        this.items = [];
        console.log("Queue initialized succesfully");
    }

    enqueue(element) {
        this.items.push(element); 
    }

    // remove first in line, and returns it.
    dequeue() {
        return this.isEmpty() ? "Queue is empty" : this.items.shift();
    }

    peek() {
        return this.isEmpty() ? "Queue is empty" : this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        console.log(this.items.join(" -> "));
    }
}