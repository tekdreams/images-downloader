function randomInt (min = 0, max = 65535) {
    let i = 0, rval = 0, bits = 0, bytes = 0;
    let range = max - min;
    if (range < 1) {
        return min;
    }
    if (window.crypto && window.crypto.getRandomValues) {
        // Calculate Math.ceil(Math.log(range, 2)) using binary operators
        let tmp = range;
        /**
         * mask is a binary string of 1s that we can & (binary AND) with our random
         * value to reduce the number of lookups
         */
        let mask = 1;
        while (tmp > 0) {
            if (bits % 8 === 0) {
                bytes++;
            }
            bits++;
            mask = mask << 1 | 1; // 0x00001111 -> 0x00011111
            tmp = tmp >>> 1;      // 0x01000000 -> 0x00100000
        }

        let values = new Uint8Array(bytes);
        do {
            window.crypto.getRandomValues(values);

            // Turn the random bytes into an integer
            rval = 0;
            for (i = 0; i < bytes; i++) {
                rval |= (values[i] << (8 * i));
            }
            // Apply the mask
            rval &= mask;
            // We discard random values outside of the range and try again
            // rather than reducing by a modulo to avoid introducing bias
            // to our random numbers.
        } while (rval > range);

        // We should return a value in the interval [min, max]
        return (rval + min);
    } else {
        // CSPRNG not available, fail closed
        throw Error('placeholder; this should be customized with accordance to whatever practices are best for Node.js')
    }
}
module.exports = randomInt;