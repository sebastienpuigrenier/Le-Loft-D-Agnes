import { useState} from "react";
import { notifySuccess, notifyError, api } from "../../../utils/utils";
import { MdDeleteForever, MdModeEditOutline, MdSave, MdClose } from "react-icons/md";
import {UploadImageForm} from "../../molecules/upload-image-form/upload-imade-form";

import "./dashboard-table-existant.css";
import { DashboardCellId, DashboardCellPriorite, DashboardCellDescription } from "../../atomes/dashboard-cells/dashboard-cells-index";

export const DashboardTableExistant = ({collection, setUpdate}) => {
  const [infoModif, setInfoModif] = useState({});
  const [imageModifFile, setImageModifFile] = useState([]);
  const [modif, setModif] = useState("");
  //const column = Object.keys(collection);
  
  
  const handleModifChange = (e) => {
    setInfoModif({
      ...infoModif,
      [e.target.name]: e.target.value,
    });
  };
 
  const prepareModifInfo = (item) => {
    setInfoModif(item);
    setModif(item.num_categories);
  };

  const handleModifSubmit = (e, uuid) => {
    e.preventDefault();
    const formModifData = new FormData();
    formModifData.append("imageFile", imageModifFile[0]);
    for (const clef in infoModif) {
      if ({}.hasOwnProperty.call(infoModif, clef)) {
        formModifData.append(clef, infoModif[clef]);
      }
    }
    const ENDPOINT = `/modif_categorie/${uuid}`;
    api
      .put(ENDPOINT, formModifData)
      .then((res) => {
        notifySuccess(`Catégorie Modifiée : ${res.data.nom}`);
      })
      .then(() => {
        setImageModifFile([]);
        setModif("");
        setUpdate(true);
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la modification.");
        console.error(err.response.data);
      });
  };

  const deleteItem = (categorieUuid, photoUuid) => {
    const ENDPOINT = `/delete_categorie/${categorieUuid}/photo/${photoUuid}`;
    api
      .delete(ENDPOINT)
      .then((res) => {
        notifySuccess(`Catégorie Supprimée : ${res.data.nom}`);
      })
      .then(() => {
        setImageModifFile([]);
        setModif("");
        setUpdate(true);
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la suppression.");
        console.error(err.response.data);
      });
  };
  return (
    <>
      <h2>Categories existantes</h2>
      <div
        className="table-container"
      >
        <div
          className="table-existant__row table-existant__header"
        >
          <div
            className="table-existant__row-item"
            id="table-existant__row-id"
          >
            <h4>id</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-priorité"
          >
            <h4>Priorité d'affichage</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-image"
          >
            <h4>Image</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-nom"
          >
            <h4>Nom</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-description"
          >
            <h4>Description</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-action"
          >
            <h4>Actions</h4>
          </div>
        </div>
        {collection.map((item) => {
          
          const uuid = item.num_produits ? item.num_produits : item.num_categories;
          return(
            <form
              key={item.num_categories}
              method="put"
              onSubmit={(e) => handleModifSubmit(e, item.num_categories)}
              id={item.num_categories}
              style={{display: 'flex', gap: '5rem'}}
            ><div
                className="table-existant__row"
              >
                <DashboardCellId
                  uuid = {uuid}
                />
                <DashboardCellPriorite
                  uuid = {uuid}
                  modif = {modif}
                  item = {item}
                  handleModifChange ={handleModifChange}
                />
                <div className="table-existant__row-item"
                  id="table-existant__row-image"
                >
                  { modif === item.num_categories
                    ? <div className="nouvelle_collection">
                      <UploadImageForm
                        imageFile={imageModifFile}
                        setImageFile={setImageModifFile}
                        defaultPhoto={item.lien}
                      />
                    </div>
                    :<img src={item.lien} className="logo-categorie" alt={item.nom} />
                  }
                </div>
                <div className="table-existant__row-item"
                  id="table-existant__row-nom"
                >
                  { modif === item.num_categories
                    ?<label
                      className="nouvelle_collection_label"
                      htmlFor="categorie_nom"
                    >
                      <input
                        className="modif_collection_text"
                        type="text"
                        name="nom"
                        id="categorie_nom"
                        defaultValue={item.nom}
                        onChange={(e) => handleModifChange(e)}
                      />
                    </label>
                    :<p>{item.nom}</p>
                  }
                </div>
                <DashboardCellDescription
                  uuid = {uuid}
                  modif = {modif}
                  item = {item}
                  handleModifChange ={handleModifChange}
                />

                <div className="table-existant__row-item"
                  id="table-existant__row-action"
                >
                  { modif === item.num_categories
                    ?<>
                      <button
                        type="submit"
                        className="reset-css-button"
                      >
                        <MdSave />
                      </button>
                      <MdClose 
                        onClick={() => setModif("")}
                      />
                    </>
                    : <> 
                      <MdModeEditOutline
                        onClick={() => prepareModifInfo(item)}
                      />
                      <MdDeleteForever
                        onClick={() => deleteItem(item.num_categories, item.num_photos)}
                      />
                    </>
                  }
                </div>
              </div>
            </form>);
        }
          
        )}
      </div>
    </>
  );
};