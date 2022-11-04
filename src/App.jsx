import React from "react";

import Categories from "./fakeData/Categorie.json";

import './App.css';
import './base.css';

import { Route, Routes } from "react-router-dom";
import { Header } from "./components/organismes/header/header";
import { Footer } from "./components/organismes/footer/footer";
import { Categorie } from "./components/pages/Categorie";

import Index from "./components/pages/Index";



function App() {
  
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route
            path="/*"
            element={<Index />}
          />
          {Categories.map((categorie, index) => 
            <Route
              key={index}
              path={`/${categorie.nom}`}
              element={<Categorie titre={categorie.nom} />}
            />
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
