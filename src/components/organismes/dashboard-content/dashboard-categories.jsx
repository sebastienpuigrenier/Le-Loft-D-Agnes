import {useEffect, useState} from "react";
import { notifySuccess, notifyError, api } from "../../../utils/utils";
import {UploadImageForm} from "../../molecules/upload-image-form/upload-imade-form";
import { DashboardTableExistant } from "../../molecules/dashboard-table-existant/dashboard-table-existant";
import "./dashboard-categories.css";

export const DashboardCategories = () => {
  const [categories, setCategories] = useState([]);
  const [infoCreate, setInfoCreate] = useState({});
  const [imageFile, setImageFile] = useState([]);
  const [update, setUpdate] = useState(false);

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
    setUpdate(false);

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
    
    const ENDPOINT = "/create_categorie";
    api
      .post(ENDPOINT, formData)
      .then((res) => {
        notifySuccess(`Nouvelle catégorie créée : ${res.data.nom}`);
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
    <div>
      <div >
        <h2>Créer une nouvelle catégorie</h2>
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
                htmlFor="categorie_nom"
              >
                <input
                  type="text"
                  name="nom"
                  id="categorie_nom"
                  placeholder="Nom de la catégorie"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="nouvelle_collection_label"
                htmlFor="categorie_priorité"
              >
                <input
                  type="number"
                  name="priorité"
                  id="categorie_priorité"
                  placeholder="Priorité d'affichage"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="nouvelle_collection_label"
                htmlFor="categorie_description"
              >
                <textarea
                  cols={500}
                  rows={5}
                  name="description"
                  id="categorie_description"
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
            <p>Enregistrer la nouvelle catégorie</p>
          </button>
        </form>
      </div>
      <hr/>
      <DashboardTableExistant
        collection = {categories}
        setUpdate = {setUpdate}
      />
    </div>);
};