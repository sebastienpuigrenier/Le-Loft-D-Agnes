import React from "react";

import Categories from "./fakeData/Categorie.json";

import './App.css';
import './base.css';

import { Route, Routes } from "react-router-dom";
import { Header } from "./components/organismes/header/header";
import { Footer } from "./components/organismes/footer/footer";
import { Categorie } from "./components/pages/Categorie";

import Index from "./components/pages/Index";
import { useEffect } from "react";
import { useContext } from "react";
import ExportContext from "./contexts/context";
import { useState } from "react";



function App() {

  const {isMenuActive} = useContext(ExportContext.Context);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {

    if(!isMenuActive){
      setShowContent(!isMenuActive);
    }

    const delayHideContent = setTimeout(() => {
      setShowContent(!isMenuActive);
    }, 500);

    return () => {
      // clears timeout before running the new effect
      clearTimeout(delayHideContent);
    };

    
  },[isMenuActive] );

  let realvh = window.innerHeight * 0.01;
  useEffect(()=> {
    realvh = window.innerHeight * 0.01;
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
