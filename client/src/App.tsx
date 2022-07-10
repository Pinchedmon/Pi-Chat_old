import Feed from "./pages/Feed";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { QueryClientProvider, QueryClient } from "react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Feed/>} /> 
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </>
  );
  }
export default App;
