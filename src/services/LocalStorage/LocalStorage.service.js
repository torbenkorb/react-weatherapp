class LocalStorage {
    constructor() {
        this.key = 'ReactWeatherApp';
        this.storageAvailable = storageAvailable('localStorage');
    }

    getData() {
        return JSON.parse(window.localStorage.getItem(this.key));
    }

    storeData(data) {
        window.localStorage.setItem(this.key, JSON.stringify(data));
    }

    hasData() {
        return window.localStorage.getItem(this.key);
    }
}

export default new LocalStorage();

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
};
