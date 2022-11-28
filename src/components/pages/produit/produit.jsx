import "./produit.css";

import Produits from "../../../fakeData/ListeProduit.json";
import Fonts from "../../../fakeData/ListePolice.json";
import Anses from "../../../fakeData/ListeAnse.json";

export const Produit = ({titre}) => {
  const produit = Produits.filter((produit) => {
    return produit.nom === titre;
  });
  const produitAAfficher = produit[0];

  let listeAnses = [];
  for (let i = 0; i < produitAAfficher.anse.length; i++) {
    listeAnses.push(Anses[produitAAfficher.anse[i]]);
  }
  
  let listePolices = [];
  for (let i = 0; i < produitAAfficher.police.length; i++) {
    listePolices.push(Fonts[produitAAfficher.police[i]]);
  }

  return (
    <div className="produit-container">
      <h1>{produitAAfficher.nom}</h1>
      <img src={produitAAfficher.photo}/>
      <p className="produit-description">{produitAAfficher.descriptif}</p>
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
          {listeAnses.map((anse, id) => {
            return <p key={id}>{anse.nom}</p>;
          })}
        </div>
        <div className="produit-information-detail-03">
          {listePolices.map((police, id) => {
            return <p key={id}>{police.nom}</p>;
          })}
        </div>
        <div className="produit-information-detail-04">
          <p>{produitAAfficher.prix}€</p>
        </div>
      </div>

    </div>
  );
};