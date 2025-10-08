export default function attempt<T>(callback: () => T): T | undefined {
    try {
        return callback();
    } catch (_) { /* Do nothing. */ }
}
