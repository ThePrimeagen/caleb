/**
 * Movement stats accumulator
 * Tracks various movement metrics while minimizing garbage collection
 * Pre-allocates all objects to avoid GC during gameplay
 */

/** @type {MovementStats} */
const stats = {
    // Jump counts [0...15] for j and k movements
    j: new Array(16).fill(0),
    k: new Array(16).fill(0),

    // Hold times for h and l
    h: 0,
    l: 0,

    // Movement counts and failures for f/F/t/T
    // Pre-allocate common letters to avoid object creation during gameplay
    f: { failed: 0, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 },
    F: { failed: 0, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 },
    t: { failed: 0, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 },
    T: { failed: 0, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 },

    // Simple count/failed stats for other movements
    "%": { count: 0, failed: 0 },
    w: { count: 0, failed: 0 },
    b: { count: 0, failed: 0 }
};

/**
 * Record a movement in the stats without creating new objects
 * @param {keyof MovementStats} key - The movement key (j/k/h/l/f/F/t/T/%/w/b)
 * @param {number|string|null} distanceOrLetter - For j/k: jump distance (0-15), for f/F/t/T: target letter
 * @param {boolean} success - Whether the movement succeeded
 */
export function recordMovement(key, distanceOrLetter = null, success = true) {
    switch (key) {
        case "j":
        case "k":
            // Ensure numeric and clamp distance between 0-15
            const jumpDistance = typeof distanceOrLetter === 'number' ? distanceOrLetter : 0;
            const distance = Math.min(Math.max(0, jumpDistance), 15) | 0; // Force integer
            stats[key][distance]++;
            break;

        case "h":
        case "l":
            // Ensure numeric and accumulate hold time
            const holdTime = typeof distanceOrLetter === 'number' ? distanceOrLetter : 0;
            stats[key] = stats[key] + holdTime; // Use assignment instead of +=
            break;

        case "f":
        case "F":
        case "t":
        case "T":
            if (!success) {
                stats[key].failed++;
            } else if (typeof distanceOrLetter === "string") {
                // Letter counters are pre-allocated, just increment
                const letter = distanceOrLetter.toLowerCase();
                if (letter >= 'a' && letter <= 'z') {
                    stats[key][letter]++;
                }
            }
            break;

        case "%":
        case "w":
        case "b":
            if (success) {
                stats[key].count++;
            } else {
                stats[key].failed++;
            }
            break;
    }
}

/**
 * Post stats to the /stats endpoint
 */
export function postStats() {
    // Since there's no endpoint yet, just log to console
    console.log("Would POST to /stats:", JSON.stringify(stats));

    // Reset stats after posting
    resetStats();
}

/**
 * Reset all stats counters without creating new objects
 * All objects are pre-allocated, just reset their values to 0
 */
function resetStats() {
    // Reset jump arrays
    stats.j.fill(0);
    stats.k.fill(0);

    // Reset hold times
    stats.h = 0;
    stats.l = 0;

    // Reset f/F/t/T movements
    for (const key of ["f", "F", "t", "T"]) {
        const obj = stats[key];
        // Reset all pre-allocated letter counters
        for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
            obj[String.fromCharCode(c)] = 0;
        }
        obj.failed = 0;
    }

    // Reset simple counters
    for (const key of ["%", "w", "b"]) {
        stats[key].count = 0;
        stats[key].failed = 0;
    }
}

export { stats };
