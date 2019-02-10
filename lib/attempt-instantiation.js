module.exports = function attemptInstantiation(instantiable, fallback) {
    try {
        return new instantiable();
    } catch (_) {
        if (fallback) {
            return new fallback();
        }
    }
};
