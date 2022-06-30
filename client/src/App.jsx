import axios from "axios";
import React, { useEffect, useState } from "react";
import './App.css';
import Nav from "./components/Nav";

import Posts from "./components/Posts";
function App() {

  const [data, setData] = useState([{}]);
  useEffect(() => {
    axios.get('http://localhost:6060/feed')
      .then(response => {
        console.log(response.data.data)
        setData(Object.values(response.data.data))
      })
      .catch(error => {
        console.error('error')
      })
  })
  return (
    <div className="app">
      <div className="menu">
        <Nav/>
      </div>
        <div className="posts">
          <Posts data={data} />
        </div> 
    </div>
  );
}
export default App;
