
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";

import "./produit.css";

export const Produit = ({titre}) => {
  const [produitAAfficher, setProduitAAfficher] = useState([]);
  const [polices, setPolices] = useState([]);
  const [cuirs, setCuirs] = useState([]);

  useEffect(() => {
    const ENDPOINT_PRODUITS = "/browse_produits";
    const ENDPOINT_POLICES = "/browse_polices";
    const ENDPOINT_CUIRS = "/browse_cuirs";

    const promiseProduits = api.get(ENDPOINT_PRODUITS);
    const promisePolices = api.get(ENDPOINT_POLICES);
    const promiseCuirs = api.get(ENDPOINT_CUIRS);

    Promise.all([promiseProduits, promisePolices, promiseCuirs])
      .then((data) => {
        const produitsTemp = data[0].data;
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
        const produit = produitsTemp.filter((produit) => {
          return produit.nom === titre;
        });
        setProduitAAfficher(produit[0]);

        setPolices(data[1].data);
        setCuirs(data[2].data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
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
        {cuirs.length>0
          ? <div className="produit-information-detail-02">
            {
              cuirs.map((cuirs, id) => {
                return <p key={id}>{cuirs.couleur}</p>;
              })
            }
          </div>
          :<p>Non disponible</p>
        }
        {cuirs.length>0
          ? <div className="produit-information-detail-03">
            {
              polices.map((police, id) => {
                return <p key={id}>{police.nom}</p>;
              })
            }
          </div>
          :<p>Non disponible</p>
        }
        <div className="produit-information-detail-04">
          <p>{produitAAfficher.prix}€</p>
        </div>
      </div>

    </div>
  );
};