export default function attempt(callback) {
    try {
        return callback();
    } catch (_) { /* Do nothing. */ }
}
