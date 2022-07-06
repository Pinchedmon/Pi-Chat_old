import React, { useEffect} from "react";
import Nav from "./pages/Feed/Nav/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Refetch } from "./pages/components/Refetch";
function App() {
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch()

  // Вот злодейский хух эффект
  useEffect(() => {
    Refetch(dispatch)
  },[])
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav dispatch={dispatch} data={posts} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  }
export default App;
