import React, { useState } from "react";
import styles from "./TopMenu.module.css"
import Authorize from "./subcomponents/authorize.js"

export default function TopMenu(props) {

  const [searchQuery, setSearchQuery] = useState('');

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function handleClick(event) {

    event.preventDefault();

    let url = 'https://api.spotify.com/v1/search?q=';
    url += encodeURIComponent(searchQuery);
    url += '&type=track&market=TR';
    console.log(url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${props.accessToken}`
        }
      });
      if (response.ok) {

        const searchResult = await response.json();
        console.log(searchResult);

        const newTracks = searchResult.tracks.items.map((item) => {

          function makeListOfArtists(arrayOfArtists) {

            let listOfArtists = "";

            arrayOfArtists.forEach((artist, index, array) => {
              if (index === 0) {
                listOfArtists = artist.name;
              } else if (index + 1 < array.length) {
                listOfArtists += ", " + artist.name;
              } else {
                listOfArtists += " & " + artist.name;
              }
            })
            
            return listOfArtists;
          }

          return (
            {
              name: item.name,
              artist: makeListOfArtists(item.artists),
              album: item.album.name,
              id: item.id,
            }
          )
        });
        
        props.setSongsFound(newTracks);

      } else {
        throw new Error ('Request to retreive records has failed!');
      }
      
    } catch (error) {
      alert(error)
    }

  }


  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span>Jammmer</span>
      </div>

      <div>
        <input value={searchQuery} onChange={handleChange} type="text" name="searchSong" id="searchSong" />
        <button onClick={handleClick}>Search Song</button>
      </div>


      <div className={styles.logo}>
        <span>Spotify powered</span>
      </div>
    </nav>
  )
}