import axios from "axios";
import React, { useEffect, useState } from "react";
import './App.css';
import Options from "./components/Options";
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
  const handleDelete = () => {
    axios.delete('http://localhost:6060/feed')
    // setData([{}])
    
      
  }
  return (
    <div>
      <nav>
        <div className="title">
          <button>
            / π - Чат /
          </button>
        </div>
        <div className="button__profile">
          <button onClick={handleDelete}>Профиль</button>
        </div>
      </nav>
      <Options />
      <div className="posts">
        <Posts data={data} />
      </div>
    </div>
  );
}
export default App;
