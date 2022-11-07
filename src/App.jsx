import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import ExportContext from "./contexts/context";

import { Index } from "./components/pages/Index";
import { Header } from "./components/organismes/header/header";
import { Footer } from "./components/organismes/footer/footer";
import { Categorie } from "./components/pages/Categorie";


import './App.css';
import './base.css';

import Categories from "./fakeData/Categorie.json";


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
