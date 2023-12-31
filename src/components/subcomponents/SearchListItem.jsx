import React, { useEffect } from "react";
import styles from "./SearchListItem.module.css"

export default function SearchListItem(props) {
    useEffect(()=>{
        localStorage.setItem('savedNewPlaylist', JSON.stringify(props.newPlaylist));
    },[props.newPlaylist]); 
    
    function handleClick() {

        if (props.add) {
             props.setNewPlaylist((curList) => {
                return ([
                    ...curList,
                    {
                        name: [props.title],
                        artist: [props.artist],
                        album: [props.album],
                        id: [props.songId]
                    }
                ])
            });
            
        } else {
             props.setNewPlaylist((curList) => {
                return (
                    curList.filter((song) => {
                        return (
                            song.id !== props.songId
                        )
                    })
                )
            });
        }
    }

    return (
        <div className={styles.listItem}>
            <div>
                <h2 className={styles.title}>{props.title}</h2>
                <p className={styles.song}>{props.artist}</p>
            </div>
            <button className={styles.listItemButton} onClick={handleClick}>{props.add ? "Add to Playlist" : "Remove"}</button>
        </div>
    )
}