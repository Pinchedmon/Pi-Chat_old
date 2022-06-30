import axios from "axios";
import React, { useEffect, useState } from "react";
import './App.css';
import Nav from "./components/Nav";

import Posts from "./components/Posts";
function App() {
  const [filterCategory, setFilterCategory] = useState('Общее');
  const [filterSort, setFilterSort] = useState('1');
  const [data, setData] = useState([{}]);
  const returnCategory = (value) => {
    setFilterCategory(value);
  }
  const returnSort = (value) => {
    setFilterSort(value);
  }
  useEffect(() => {
    axios.get('http://localhost:6060/feed')
      .then(response => {
        setData(Object.values(response.data.data))
      })
      .catch(error => {
        console.error('error')
      })
  })
  return (
    <div className="app">
      <div className="menu">
        <Nav returnCategory={returnCategory} returnSort={returnSort}/>
      </div>
        <div className="posts">
          <Posts category={filterCategory} sort={filterSort} data={data} />
        </div> 
    </div>
  );
}
export default App;
