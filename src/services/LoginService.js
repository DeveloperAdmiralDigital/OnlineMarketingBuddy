// const AuthStr = 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=';

//const URL = 'http://localhost:8181/oauth/token';
// const URL = 'https://67.209.127.225:8181/oauth/token';

export function fetchToken(username, password) {
    return true;
    /*return fetch(URL + '?grant_type=password&username=' + username + '&password=' + password, {
        method: 'POST',
        headers: {
            'Authorization': AuthStr,
            'Content-Type': 'application/json'
        },
        mode: "cors",
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            if (responseJson.hasOwnProperty("access_token")) {
                let JWT = responseJson;
                let now = Date.now();
                JWT.expires_in = now + JWT.expires_in * 1000;
                localStorage.setItem('currentUser', JSON.stringify(username));
                localStorage.setItem('userToken', JSON.stringify(JWT));
                return true;
            }
            return false;
        })
        .catch((err) => {
            console.log("geen response");
            return false;
        });*/
}

export function logout() {
    /*localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');*/
    return true;
}

export function checkToken() {
    return true;
    /*if (localStorage.getItem('userToken') != null) {
        let jwt = JSON.parse(localStorage.getItem('userToken'));
        let current_time = Date.now();
        if (jwt.expires_in > current_time) {
            return true;
        }
    }
    localStorage.removeItem('userToken');
    return false;*/
}