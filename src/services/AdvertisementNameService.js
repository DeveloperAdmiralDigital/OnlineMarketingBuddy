import * as fetchService from "./FetchService";
const BASE_URL = "advertisementNames/";


export function getAll() {
    return fetchService.fetchWithHeader(BASE_URL, "GET", {}, {value: "value not found"});
}

export function postData(data) {
    fetchService.fetchWithHeader(BASE_URL, "POST", data, {});
}

export function updateData(id, data) {
    return fetchService.fetchWithHeader(BASE_URL + "advertisementName/" + id, "PUT", data, {});
}

export function getAnalytics(id,data) {
    return fetchService.fetchWithHeader(BASE_URL + "analyticsCalculations/" + id, "POST", data, {value: "value not found"});
}

export function getAllDetails(data) {
    return fetchService.fetchWithHeader(BASE_URL + "details/", "POST", data, {value: "value not found"});
}

export function getDetails(id,data) {
    return fetchService.fetchWithHeader(BASE_URL + "details/" + id, "POST", data, {value: "value not found"});
}

export function getFacebook(id,data) {
    return fetchService.fetchWithHeader(BASE_URL + "facebookCalculations/" + id, "POST", data, {value: "value not found"});
}

export function deleteById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "DELETE", {}, {});
}

export function getById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "GET", {}, {value: "value not found"});
}
