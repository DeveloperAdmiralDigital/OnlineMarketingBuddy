import * as fetchService from "./FetchService";
const BASE_URL = "analyticsProfile/";

export function getAll(accountId, propertyId) {
    return fetchService.fetchWithHeader(BASE_URL + "analyticsAccount/" + accountId + "/analyticsProperty/" + propertyId, "GET", {}, {value: "value not found"});
}

export function getById(id) {
    return fetchService.fetchWithHeader(BASE_URL +"analyticsProfile/"+ id, "GET", {}, {value: "value not found"});
}

export function updateData(id, data) {
    return fetchService.fetchWithHeader(BASE_URL + "analyticsProfile/" + id, "PUT", data, {});
}

export function postData(id,data) {
    fetchService.fetchWithHeader(BASE_URL + "analyticsProperty/" + id, "POST", data, {});
}

export function deleteById(id) {
    return fetchService.fetchWithHeader(BASE_URL + id, "DELETE", {}, {});
}

