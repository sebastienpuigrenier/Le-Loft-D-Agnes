import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/organismes/footer/footer";

import Index from "./components/pages/Index";

import './App.css';
import './base.css';


function App() {
  
  return (
    <div>
      <div>
        <Routes>
          <Route path="/*" element={<Index />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
