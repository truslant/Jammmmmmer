import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TopMenu from './components/TopMenu';
import SearchResults from './components/SearchResults';




function App({accessToken}) {
  const [songsFound, setSongsFound] = useState([]);
 
  return (
    <div className="App">
      <TopMenu songsFound={songsFound} setSongsFound={setSongsFound} accessToken={accessToken}/>
      <SearchResults songsFound={songsFound} setSongsFound={setSongsFound} accessToken={accessToken}/>

    </div>
  );
}

export default App;
