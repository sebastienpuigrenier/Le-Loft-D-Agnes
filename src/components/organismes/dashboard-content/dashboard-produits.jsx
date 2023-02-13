import {useEffect, useState} from "react";
import { api } from "../../../utils/utils";
import { DashboardTableExistant } from "../../molecules/dashboard-table-existant/dashboard-table-existant";

export const DashboardProduits = () => {
  const [update, setUpdate] = useState(false);
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
  }, [update]);

  return (
    <>
      <h2>Dashboard Produits</h2>
      <hr/>
      <DashboardTableExistant
        collection = {produits}
        setUpdate = {setUpdate}
      />
    </>
  );
};