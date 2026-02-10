export function logger(message: string, color: string = 'white') {
  console.log(`%c ${message}`, `background: ${color}; color: black; padding: 6px 8px`);
}

export function nullSafe(func: any, fallbackValue: any = null) {
  try {
    const value = func();
    return value === null || value === undefined ? fallbackValue : value;
  } catch (e) {
    return fallbackValue;
  }
}
