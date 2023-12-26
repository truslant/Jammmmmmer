import React, { useState } from "react";
import styles from "./TopMenu.module.css"
import Authorize from "./subcomponents/authorize.js"
import Cookies from "js-cookie";

export default function TopMenu(props) {

  const [searchQuery, setSearchQuery] = useState('');
  
  let accessToken = Cookies.get('JammmerToken');

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function handleClick(event) {

    event.preventDefault();

    //put together url for track search via Spotify API
    let url = 'https://api.spotify.com/v1/search?q=';
    url += encodeURIComponent(searchQuery);
    url += '&type=track&market=TR';
    console.log(url);

    try {
      // send track search request to Spotify API
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if (response.ok) {

        const searchResult = await response.json();
        // console.log(searchResult);

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
        // console.log(props.songsFound);
        localStorage.setItem('savedSearchQuery', JSON.stringify(newTracks));

        // console.log(JSON.parse(localStorage.getItem('savedSearchQuery')));
        //Cookies.set('JammmerToken', newAccessToken, { expires: newTimer / (24 * 60 * 60) });
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