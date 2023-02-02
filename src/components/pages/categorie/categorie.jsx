import { mobileFooterHeight, mobileHeaderHeight } from "../../../utils/divDimensions";
import { SummaryProduct } from "../../molecules/summary-product/summary-product";
import "./categorie.css";

import { useEffect, useState } from "react";
import { api } from "../../../utils/api";


export const Categorie = ({titre, id}) => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const ENDPOINT = "/browse_produits";
    api
      .get(ENDPOINT)
      .then((res) => {
        const produitsTemp = res.data;
        /*
        ** localhost cannot be load due to security issues.
        ** load fake data when use with localhost
        */
        if (process.env.REACT_APP_BACKEND_URL === "http://localhost:5000") {
          produitsTemp.map((produit) => {
            produit.lien = produit.localhostlien;
          });
        } else {
          produitsTemp.map((produit) => {
            produit.lien = `${process.env.REACT_APP_BACKEND_URL}/uploads/${produit.lien}`;
          });          
        }
        setProduits(produitsTemp);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const minHeight = 100 - mobileFooterHeight - mobileHeaderHeight;
  return (
    <div
      style={{minHeight: `${minHeight}vh`}}
    >
      <h2 className="categorie-title">{titre}</h2>
      <div className="categorie-container">
        {produits
          .filter((produit) => {
            return produit.num_categories === id;
          })
          .map((produit) => {
            return <SummaryProduct
              key={produit.num_produit}
              produit={produit}
            />;
          
          })}
      </div>
    </div>
  );
};