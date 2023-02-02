
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";

import "./produit.css";

export const Produit = ({titre}) => {
  const [produitAAfficher, setProduitAAfficher] = useState([]);

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
        const produits = produitsTemp;
        const produit = produits.filter((produit) => {
          return produit.nom === titre;
        });
        setProduitAAfficher(produit[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  /*
  let listeAnses = [];
  for (let i = 0; i < produitAAfficher.anse.length; i++) {
    listeAnses.push(Anses[produitAAfficher.anse[i]]);
  }
  
  let listePolices = [];
  for (let i = 0; i < produitAAfficher.police.length; i++) {
    listePolices.push(Fonts[produitAAfficher.police[i]]);
  }
*/
  return (
    <div className="produit-container">
      <h1>{produitAAfficher.nom}</h1>
      <img src={produitAAfficher.lien}/>
      <p className="produit-description">{produitAAfficher.description}</p>
      <div className="produit-information-container">
        <div className="produit-information-titre-01">
          <p>Dimensions :</p>
        </div>
        <div className="produit-information-titre-02">
          <p>Couleur des anses :</p>
        </div>
        <div className="produit-information-titre-03">
          <p>Polices d'écriture :</p>
        </div>
        <div className="produit-information-titre-04">
          <p>Prix :</p>
        </div>
        <div className="produit-information-detail-01">
          <p>{produitAAfficher.longueur} x {produitAAfficher.largeur} x {produitAAfficher.hauteur}</p>
        </div>
        <div className="produit-information-detail-02">
          {/*
          listeAnses.map((anse, id) => {
            return <p key={id}>{anse.nom}</p>;
          })
        */}
        </div>
        <div className="produit-information-detail-03">
          {/*
          listePolices.map((police, id) => {
            return <p key={id}>{police.nom}</p>;
          })
        */}
        </div>
        <div className="produit-information-detail-04">
          <p>{produitAAfficher.prix}€</p>
        </div>
      </div>

    </div>
  );
};