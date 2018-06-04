import * as fetchService from "./FetchService";
const BASE_URL = "analyticsProperty/";

export function getAll(id) {
    return fetchService.fetchWithHeader(BASE_URL + "analyticsAccount/" + id, "GET", {}, {value: "value not found"});
}

export function postData(id,data) {
    fetchService.fetchWithHeader(BASE_URL + "analyticsAccount/" + id, "POST", data, {});
}

export function getById(id) {
    return fetchService.fetchWithHeader(BASE_URL +"analyticsProperty/"+ id, "GET", {}, {value: "value not found"});
}

export function updateData(id, data) {
    return fetchService.fetchWithHeader(BASE_URL + "analyticsProperty/" + id, "PUT", data, {});
}
export function deleteById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "DELETE", {}, {});
}

