import React from "react";
import styles from "./SavePlaylistInput.module.css";

export default function SavePlaylistInput(props) {


    function handleChange(event) {
        props.setPlaylistName(event.target.value);
    }

    async function addTracksToPlaylist(newPlaylistId, newPlaylist) {
        let url = `https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${props.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "uris": newPlaylist.map((track) => {
                        return (
                            (`spotify:track:${track.id}`)
                        )
                    })
                })
            });
            if (response.ok) {
                const playlistSnapshot = await response.json();
                
                console.log(`Playlist snapshot id: ${playlistSnapshot.snapshot_id}`);
            } else {
                throw new Error('Unable to save Tracks to Playlist ${newPlaylistId}');
            }

        } catch (error) {
            alert(error)
        }
    }

    async function handleClick() {
        let url = 'https://api.spotify.com/v1/me';
        let userId;
        let newPlaylistId;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${props.accessToken}`
                }
            });
            if (response.ok) {
                const userProfile = await response.json();
                userId = userProfile.id;
            } else {
                throw new Error('User Profile retreival failed!');
            }

        } catch (error) {
            alert(`Cannot retreive user profile: ${error}`);
        }

        if (props.playlistName) {
            let url = `https://api.spotify.com/v1/users/${userId}/playlists`
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${props.accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": `${props.playlistName}`,
                        "description": `New playlist created using Jammmer: ${props.playlistName}`,
                        "public": false
                    })
                });
                if (response.ok) {
                    const newPlaylist = await response.json();
                    newPlaylistId = newPlaylist.id;

                    addTracksToPlaylist(newPlaylistId, props.newPlaylist);

                } else {
                    throw new Error('Unable to create new Playlist!');
                }

            } catch (error) {
                alert(error);
            }
        }


        props.setPlaylistName("");
        props.setNewPlaylist([]);

    }
    return (
        <div className={styles.saveInput}>
            <input type="text" name="searchSong" id="searchSong" placeholder="Enter Playlist name..." value={props.playListName} onChange={handleChange} />
            <button onClick={handleClick}>Save Playlist</button>
        </div>
    );
}
