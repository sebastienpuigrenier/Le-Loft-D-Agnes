import React, { useState, useEffect } from "react";

import { api } from "../../utils/api";
//import logo from '../../logo.svg';
import { IndexCategorieLine } from "../molecules/index-categorie-line/index-categorie-line";
// import { Categorie } from './Categorie';

export const Index = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const ENDPOINT_CATEGORIES = "/browse_categories";
    
    api
      .get(ENDPOINT_CATEGORIES)
      .then((res) => {
        const categoriesTemp = res.data;
        /*
        ** localhost cannot be load due to security issues.
        ** load fake data when use with localhost
        */
        if (process.env.REACT_APP_BACKEND_URL === "http://localhost:5000") {
          categoriesTemp.map((categorie) => {
            categorie.lien = categorie.localhostlien;
          });
        } else {
          categoriesTemp.map((categorie) => {
            categorie.lien = `${process.env.REACT_APP_BACKEND_URL}/uploads/${categorie.lien}`;
          });          
        }
        setCategories(categoriesTemp);
      }
      )
      .catch((error) => {
        console.error(error);
      });

  }, []);
  
  return (
    <div className="index-main-container">
      {categories.map((categorie, index) => {
        return (
          <IndexCategorieLine
            key={index}
            categorie={categorie}
          />
        );
      })}
    </div>
  );
};

export default Index;
