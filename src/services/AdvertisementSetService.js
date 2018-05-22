import * as fetchService from "./FetchService";
const BASE_URL = "advertisementSets/";


export function getAll() {
    return fetchService.fetchWithHeader(BASE_URL, "GET", {}, {value: "value not found"});
}

export function postData(data) {
    fetchService.fetchWithHeader(BASE_URL, "POST", data, {});
}

export function getAdName(id) {
    return fetchService.fetchWithHeader(BASE_URL + "advertisementNames/" + id, "GET", {}, {value: "value not found"});
}

export function updateData(id, data) {
    return fetchService.fetchWithHeader(BASE_URL + "advertisementSet/" + id, "PUT", data, {});
}

export function getAllNames(){
    return fetchService.fetchWithHeader(BASE_URL + "advertisementSetName/","GET",{},{value: "value not found"})
}

export function getNames(id){
    return fetchService.fetchWithHeader(BASE_URL + "advertisementSetName/" + id,"GET",{},{value: "value not found"})
}

export function getAnalytics(id) {
    return fetchService.fetchWithHeader(BASE_URL + "analyticsCalculations/" + id, "GET", {}, {value: "value not found"});
}

export function getDetails(id) {
    return fetchService.fetchWithHeader(BASE_URL + "details/" + id, "GET", {}, {value: "value not found"});
}

export function getFacebook(id) {
    return fetchService.fetchWithHeader(BASE_URL + "facebookCalculations/" + id, "GET", {}, {value: "value not found"});
}

export function deleteById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "DELETE", {}, {});
}

export function getById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "GET", {}, {value: "value not found"});
}

