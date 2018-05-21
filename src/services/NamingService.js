import * as fetchService from "./FetchService";
const BASE_URL = "advertisementNames/";


export function getAll() {
    return fetchService.fetchWithHeader(BASE_URL, "GET", {}, {value: "value not found"});
}

export function getById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "GET", {}, {value: "value not found"});
}

export function postData(data) {
    fetchService.fetchWithHeader(BASE_URL, "POST", data, {});
}

export function updateData(id, data) {
    return fetchService.fetchWithHeader(BASE_URL + "advertisementName/" + id, "PUT", data, {});
}

export function deleteById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "DELETE", {}, {});
}