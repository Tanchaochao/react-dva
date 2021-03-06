export default function keys(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(i => i.name);
  }

  return Object.keys(value);
}
