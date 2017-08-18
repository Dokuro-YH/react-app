export function storeItem(key, item) {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) { /* ignore */ }
}

export function getItem(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) { /* ignore */ }
  return null;
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
