import LocalStorage from "./LocalStorage";

export default class Sessions {
    constructor() {}

    getSessionsData(key, currentDate) {
        let value = LocalStorage.get(key);

        return value && value.hasOwnProperty(currentDate) ? value[currentDate] : "Сеансов нет";
    }
}