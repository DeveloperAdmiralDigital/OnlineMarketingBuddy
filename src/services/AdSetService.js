import * as fetchService from "./FetchService";
const BASE_URL = "advertisementSets/";


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
    return fetchService.fetchWithHeader(BASE_URL + "advertisementSet/" + id, "PUT", data, {});
}

export function deleteById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "DELETE", {}, {});
}

export function getDetails(id) {
    return fetchService.fetchWithHeader(BASE_URL + "details/" + id, "GET", {}, {value: "value details not found"});
}

export function getAnalytics(id) {
    return fetchService.fetchWithHeader(BASE_URL + "analyticsCalculations/" + id, "GET", {}, {value: "value analytics not found"});
}

export function getFacebook(id) {
    return fetchService.fetchWithHeader(BASE_URL + "facebookCalculations/" + id, "GET", {}, {value: "value facebook not found"});
}