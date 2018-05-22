const URL = 'https://67.209.127.225:8181/api/';

export function fetchWithHeader(api = "", method = 'GET', body = {}, error = {}) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = {
        'Content-Type': 'application/json',
        // 'Authorization': userToken.token_type + " " + userToken.access_token,
    };
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': userToken.token_type + " " + userToken.access_token,
        }
    }
        return fetch(URL + api,
            {
                mode: 'cors',
                method: method,
                headers: headers,
                body: body
            })
            .then((response) =>
                response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((err) => {
                console.log("no response");
                return error;
            });
    return {};
}
