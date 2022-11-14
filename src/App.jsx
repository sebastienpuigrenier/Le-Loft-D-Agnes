import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import ExportContext from "./contexts/context";

import { Index } from "./components/pages/Index";
import { Header } from "./components/organismes/header/header";
import { Footer } from "./components/organismes/footer/footer";
import { Categorie } from "./components/pages/categorie/categorie";
import { Produit } from "./components/pages/produit/produit";


import './App.css';
import './base.css';

import Categories from "./fakeData/Categorie.json";
import ListeProduit from "./fakeData/ListeProduit.json";


function App() {
  const {isMenuActive} = useContext(ExportContext.Context);
  const [showContent, setShowContent] = useState(false);
  const [realvh, setRealVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    if(!isMenuActive){
      setShowContent(!isMenuActive);
    }

    const delayHideContent = setTimeout(() => {
      setShowContent(!isMenuActive);
    }, 500);

    return () => {
      clearTimeout(delayHideContent);
    };
    
  },[isMenuActive] );

  useEffect(()=> {
    setRealVh(window.innerHeight * 0.01);
    document.documentElement.style.setProperty('--vh', `${realvh}px`);

  }, []);

  window.addEventListener('resize', () => {
    let realvh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${realvh}px`);
  });
  
  return (
    <div>
      <Header />
      <div style={showContent ? {display: 'block'} : {display: 'none'}}>
        <Routes>
          {Categories.map((categorie, index) => 
            <Route
              key={index}
              path={`/${categorie.nom}`}
              element={<Categorie titre={categorie.nom} />}
            />
          )}
          {ListeProduit.map((produit, index) => 
            <Route
              key={index}
              path={`/${produit.nom}`}
              element={<Produit titre={produit.nom} />}
            />
          )}
          <Route
            path="/*"
            element={<Index />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
