class Storage {
  getItem() {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : {};
  }

  setItem(key, value) {
    if (!value) return;
    const stringified = JSON.stringify(value);
    localStorage.setItem(key, stringified);
    return this;
  }
}

export default new Storage();
