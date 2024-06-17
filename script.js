function dijkstra(graph, start) {
    // Step 1: Initialize the distances object and the priority queue
    const distances = {};
    const priorityQueue = new PriorityQueue();
    
    // Set all distances to infinity except the start vertex
    for (let vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            priorityQueue.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            priorityQueue.enqueue(vertex, Infinity);
        }
    }

    // Step 3: Process the vertices
    while (!priorityQueue.isEmpty()) {
        const { vertex: currentVertex, priority: currentDistance } = priorityQueue.dequeue();
        
        // Iterate over the neighbors of the current vertex
        for (let neighbor in graph[currentVertex]) {
            const weight = graph[currentVertex][neighbor];
            const distance = currentDistance + weight;

            // If a shorter path is found
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                priorityQueue.enqueue(neighbor, distance);
            }
        }
    }

    // Step 4: Return the distances
    return distances;
}

// Priority Queue implementation using a min heap
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(vertex, priority) {
        this.queue.push({ vertex, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Example usage
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A'));
// Output: { A: 0, B: 4, C: 2, D: 5 }
