export default class LocalStorage {
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key) {
        let value = localStorage.getItem(key);
        return JSON.parse(value);
    }
}