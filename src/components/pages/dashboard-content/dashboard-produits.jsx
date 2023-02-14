import {useEffect, useState} from "react";
import { notifySuccess, notifyError, api } from "../../../utils/utils";
import {UploadImageForm} from "../../molecules/upload-image-form/upload-imade-form";
import { DashboardTableExistant } from "../../organismes/dashboard-table-existant/dashboard-table-existant";

export const DashboardProduits = () => {
  const [update, setUpdate] = useState(false);
  const [produits, setProduits] = useState([]);
  const [infoCreate, setInfoCreate] = useState({});
  const [imageFile, setImageFile] = useState([]);

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
  
  const handleChange = (e) => {
    setInfoCreate({
      ...infoCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", imageFile[0]);
    for (const clef in infoCreate) {
      if ({}.hasOwnProperty.call(infoCreate, clef)) {
        formData.append(clef, infoCreate[clef]);
      }
    }
    
    const ENDPOINT = "/create_produit";
    api
      .post(ENDPOINT, formData)
      .then((res) => {
        notifySuccess(`Nouveau produit créé : ${res.data.nom}`);
      })
      .then(() => {
        e.target.reset();
        setImageFile([]);
        setUpdate(true);
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la création.");
        console.error(err.response.data);
      });
  };

  return (
    <>
      <div >
        <h2>Créer un nouveau produit</h2>
        <form
          className="global_form_container"
          action="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div
            className="nouvelle_collection_form_container">
            <div className="nouvelle_collection">
              <UploadImageForm imageFile={imageFile} setImageFile={setImageFile} />
            </div>
            <div
              className="nouvelle_collection_inputs_container"
            >
              <label
                className="nouvelle_collection_label"
                htmlFor="produit_nom"
              >
                <input
                  type="text"
                  name="nom"
                  id="produit_nom"
                  placeholder="Nom du produit"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="nouvelle_collection_label"
                htmlFor="produit_priorité"
              >
                <input
                  type="number"
                  name="priorité"
                  id="produit_priorité"
                  placeholder="Priorité d'affichage"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="nouvelle_collection_label"
                htmlFor="produit_description"
              >
                <textarea
                  cols={500}
                  rows={5}
                  name="description"
                  id="produit_description"
                  placeholder="Description"
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>
          </div>
          <button
            id="add-new"
            className="nouvelle-collection-button"
            type="submit"
            required
          >
            <p>Enregistrer le nouveau produit</p>
          </button>
        </form>
      </div>
      <hr/>
      <DashboardTableExistant
        collection = {produits}
        setUpdate = {setUpdate}
      />
    </>
  );
};