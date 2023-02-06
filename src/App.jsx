import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import ExportContext from "./contexts/context";
import { api, PrivateRoute } from "./utils/utils";

import { Index } from "./components/pages/Index";
import { Header } from "./components/organismes/header/header";
import { Footer } from "./components/organismes/footer/footer";
import { Categorie } from "./components/pages/categorie/categorie";
import { Produit } from "./components/pages/produit/produit";
import { AdminLogin } from "./components/pages/adminLogin/adminLogin";
import { Dashboard } from "./components/pages/dashboard/dashboard";
import { DashboardIndex } from "./components/organismes/dashboard-content/dashboard-index";
import {
  DashboardCategories,
  DashboardProduits,
  DashboardPolices,
  DashboardCuirs
} from "./components/organismes/dashboard-content/dashboard-content-index";


import './App.css';
import './base.css';



function App() {
  const {isMenuActive, infoUser} = useContext(ExportContext.Context);
  const [showContent, setShowContent] = useState(false);
  const [realvh, setRealVh] = useState(window.innerHeight * 0.01);

  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const ENDPOINT_CATEGORIES = "/browse_categories";
    const ENDPOINT_PRODUITS = "/browse_produits";
    
    api
      .get(ENDPOINT_CATEGORIES)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api
      .get(ENDPOINT_PRODUITS)
      .then((res) => {
        setProduits(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          {categories.map((categorie, index) => 
            <Route
              key={index}
              path={`/${categorie.nom}`}
              element={<Categorie titre={categorie.nom} id={categorie.num_categories}/>}
            />
          )}
          {produits.map((produit, index) => 
            <Route
              key={index}
              path={`/${produit.nom}`}
              element={<Produit titre={produit.nom} />}
            />
          )}
          <Route
            path="/Administration"
            element={<AdminLogin />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAllowed={infoUser.email}>
                <Dashboard />
              </PrivateRoute>}
          >
            <Route
              index
              element={
                <PrivateRoute isAllowed={infoUser.email}>
                  <DashboardIndex />
                </PrivateRoute>
              }
            />
            <Route
              path="categories"
              element={
                <PrivateRoute isAllowed={infoUser.email}>
                  <DashboardCategories />
                </PrivateRoute>
              }
            />
            <Route
              path="produits"
              element={
                <PrivateRoute isAllowed={infoUser.email}>
                  <DashboardProduits />
                </PrivateRoute>
              }
            />
            <Route
              path="polices"
              element={
                <PrivateRoute isAllowed={infoUser.email}>
                  <DashboardPolices />
                </PrivateRoute>
              }
            />
            <Route
              path="cuirs"
              element={
                <PrivateRoute isAllowed={infoUser.email}>
                  <DashboardCuirs />
                </PrivateRoute>
              }
            />
          </Route>
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
