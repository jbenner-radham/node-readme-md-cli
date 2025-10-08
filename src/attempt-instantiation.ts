export default function attemptInstantiation<T, FB>(
  instantiable: new () => T,
  fallback: new () => FB
): T | FB {
  try {
    return new instantiable();
  } catch (error) {
    if (fallback) {
      return new fallback();
    }

    throw error;
  }
}
