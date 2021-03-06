import * as fetchService from "./FetchService";
const BASE_URL = "advertisementAccounts/";


export function getAll() {
    return fetchService.fetchWithHeader(BASE_URL, "GET", {}, {value: "value not found"});
}

export function postData(data) {
    fetchService.fetchWithHeader(BASE_URL, "POST", data, {});
}

export function updateData(id, data) {
    return fetchService.fetchWithHeader(BASE_URL + "advertisementAccount/" + id, "PUT", data, {});
}

export function getNames() {
    return fetchService.fetchWithHeader(BASE_URL + "advertisementAccountName/", "GET", {}, {value: "value analytics not found"});
}

export function getDetails(id) {
    return fetchService.fetchWithHeader(BASE_URL + "details/" + id, "GET", {}, {value: "value details not found"});
}

export function deleteById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "DELETE", {}, {});
}

export function getById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "GET", {}, {value: "value not found"});
}
