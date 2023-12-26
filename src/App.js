import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TopMenu from './components/TopMenu';
import SearchResults from './components/SearchResults';
import Cookies from "js-cookie";



function App({accessToken}) {
  const [songsFound, setSongsFound] = useState([]);
  
  useEffect(()=>{
    let oldSongsFound = JSON.parse(localStorage.getItem('savedSearchQuery'));
    console.log(oldSongsFound);
    oldSongsFound && setSongsFound(oldSongsFound);
  },[]);

  return (
    <div className="App">
      <TopMenu songsFound={songsFound} setSongsFound={setSongsFound} />
      <SearchResults songsFound={songsFound} setSongsFound={setSongsFound} />

    </div>
  );
}

export default App;
