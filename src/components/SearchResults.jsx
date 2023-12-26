import React, { useEffect, useState } from "react";
import styles from "./SearchResults.module.css";
import SearchListItem from "./subcomponents/SearchListItem";
import SavePlaylistInput from "./subcomponents/SavePlaylistInput";



export default function SearchResults(props) {
    const [newPlaylist, setNewPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState()
    
    useEffect(()=>{
        const savedNewPlaylist = JSON.parse(localStorage.getItem('savedNewPlaylist'));
        console.log(savedNewPlaylist);
        setNewPlaylist(savedNewPlaylist);
    },[]);

    return (
        <main className={styles.listSection}>
            <section className={styles.list}>
                {props.songsFound.map((song) => {
                    return <SearchListItem key={song.id} title={song.name} artist={song.artist} album={song.album} songId={song.id} add={[true]} newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} />
                })}
            </section>

            <section className={styles.list}>

                {newPlaylist.map((song) => {
                    return <SearchListItem key={song.id} title={song.name} artist={song.artist} album={song.album} songId={song.id} newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} />
                })}

                {newPlaylist.length > 0 && <SavePlaylistInput playlistName={playlistName} setPlaylistName={setPlaylistName} newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} />}

            </section>
        </main>
    );

}

