export class LRUCache<V, K extends number | string = string> {
    cache = new Map<K, V>();

    constructor(
        public readonly capacity: number
    ) {
    }

    // Helper function to update the cache
    updateCache(key: K) {
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value!);
    }

    // Get the value for a given key from the cache
    get(key: K): V | undefined {
        if (this.cache.has(key)) {
            this.updateCache(key);
            return this.cache.get(key);
        }
    }

    // Add or update a key-value pair in the cache
    put(key: K, value: V) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // If the cache is full, remove the least recently used item (the first entry)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}