export class LocalStorage {
    static set(key, value) {
        try{
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {}
    }

    static get(key) {
        try {
            let sessions = localStorage.getItem(key);
            return JSON.parse(sessions);
        } catch (e) {
            return null;
        }
    }
}