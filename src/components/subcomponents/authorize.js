import Cookies from 'js-cookie';


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


export function AuthOnLoad(setAccessToken) {

    let newAccessToken = undefined;
    let newTimer = undefined;
    let error = undefined;
    let newIntervalId = undefined;

    function tokenExpiryReset() {
        setAccessToken(undefined);
        alert('Access Token expired. Re-authentication required!')
        AuthOnLoad(setAccessToken);
    }

    let accessToken = Cookies.get('JammmerToken');
    let accessTokenRequested = Cookies.get('JammerTokenRequested');

    //if there are no records of accessToken existing and accessToken was requested then:
    if (!accessToken && accessTokenRequested) {
       
        //retreive the data in the url after the # symbol
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        newAccessToken = params.get('access_token');
        Cookies.remove('JammerTokenRequested');

        //if access token  has been successfully retreived then perform:
        if (newAccessToken) {
            //retreive the validity time for the token (in seconds)
            newTimer = params.get('expires_in');
            console.log(newTimer);

            //write into the cookie the token
            Cookies.set('JammmerToken', newAccessToken, { expires: newTimer / (24 * 60 * 60) });

            //send the token to the main app enviroment so it could propogate as props to the rest of modules
            setAccessToken(newAccessToken);
            console.log(newAccessToken);

            //set timer for re-authorization everytime the token is expired:
            newIntervalId = setInterval(tokenExpiryReset, newTimer * 1000);
            // newIntervalId = setInterval(tokenExpiryReset, 10);
            console.log(newIntervalId);

            //under construction:
            const homepage = process.env.REACT_APP_HOMEPAGE_URL;
            console.log(homepage);
            window.location.href = homepage;
        
        // if access token has not been retreived:
        } else {
            //search for the error message in the URL string:
            const params = new URLSearchParams(window.location.search);
            error = params.get('error');
            error && alert('Authorization failed. Error message: ${error}')
        }

    }

    //if there are no traces of accessToken and it has not been requested then send user to authorization page:
    if (!accessToken && !accessTokenRequested) {
        const client_id = "360d0f6e168c485c87077d2f6cc04430";
        const redirect_uri = "http://localhost:3000/";
        const scope = "playlist-modify-public playlist-modify-private";

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

        //create the cookie stating that the token has been requested:
        Cookies.set('JammerTokenRequested', true, { expires: 1 / 24 });

        // Redirect the user
        window.location.href = url;

    }

}