import { mobileFooterHeight, mobileHeaderHeight } from "../../../utils/divDimensions";
import { SummaryProduct } from "../../molecules/summary-product/summary-product";
import "./categorie.css";

import Produits from "../../../fakeData/ListeProduit.json";

export const Categorie = ({titre}) => {
  const minHeight = 100 - mobileFooterHeight - mobileHeaderHeight;
  return (
    <div
      style={{minHeight: `${minHeight}vh`}}
    >
      <h2 className="categorie-title">{titre}</h2>
      <div className="categorie-container">
        {Produits
          .filter((produit) => {
            return produit.categorie === titre;
          })
          .map((produit) => {
            console.warn('produit', produit);
            return <SummaryProduct
              key={produit.id}
              produit={produit}
            />;
          
          })}
      </div>
    </div>
  );
};