import Nav from "./pages/Feed/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav dispatch={dispatch}  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  }
export default App;
