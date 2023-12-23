
export default function Authorize(event) {
    event.preventDefault()
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const redirect_uri = "http://localhost:3000/";

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

    // Redirect the user
    window.location.href = url;

    const hash = window.location.hash.substring(1);
    let params = new URLSearchParams(hash);

    const accessToken = params.get('access_token');
  

    if (accessToken) {

        return accessToken;
    } else {
        params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        alert('Authorization failed. Error message: ${error}')
    }
}


export function AuthOnLoad(callback, accessToken) {
    let newAccessToken = undefined;
    let error = undefined;
    if (!accessToken) {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        newAccessToken = params.get('access_token');
        newAccessToken && callback(newAccessToken);

    }

    if (!newAccessToken) {
        const params = new URLSearchParams(window.location.search);
        error = params.get('error');
        error && alert('Authorization failed. Error message: ${error}')
    }

    if (!newAccessToken && !error) {
        const client_id = "360d0f6e168c485c87077d2f6cc04430";
        const redirect_uri = "http://localhost:3000/";
        const scope = "playlist-modify-public playlist-modify-private";

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

        // Redirect the user
        window.location.href = url;
    }

}