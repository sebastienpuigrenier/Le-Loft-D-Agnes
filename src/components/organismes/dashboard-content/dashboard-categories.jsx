import {useEffect, useState} from "react";
import { notifySuccess, notifyError, api } from "../../../utils/utils";
import { MdDeleteForever, MdModeEditOutline, MdSave, MdClose } from "react-icons/md";
import {UploadImageForm} from "../../molecules/upload-image-form/upload-imade-form";

import "./dashboard-categories.css";

export const DashboardCategories = () => {
  const [categories, setCategories] = useState([]);
  const [infoCreate, setInfoCreate] = useState({});
  const [infoModif, setInfoModif] = useState({});
  const [imageFile, setImageFile] = useState([]);
  const [imageModifFile, setImageModifFile] = useState([]);
  const [modif, setModif] = useState("");
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
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la création.");
        console.error(err.response.data);
      });
    e.target.reset();
    setImageFile([]);
    setUpdate(true);
  };
 
  const handleModifChange = (e) => {
    setInfoModif({
      ...infoModif,
      [e.target.name]: e.target.value,
    });
  };

  const handleModifSubmit = (e, uuid) => {
    e.preventDefault();
    const formDataModif = new FormData();
    formDataModif.append("imageFile", imageFile[0]);
    for (const clef in infoCreate) {
      if ({}.hasOwnProperty.call(infoCreate, clef)) {
        formDataModif.append(clef, infoCreate[clef]);
      }
    }
    const ENDPOINT = `/modif_categorie/${uuid}`;
    api
      .post(ENDPOINT, formDataModif)
      .then((res) => {
        notifySuccess(`Catégorie Modifiée : ${res.data.nom}`);
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la modification.");
        console.error(err.response.data);
      });
    setImageFile([]);
    setModif("");
    setUpdate(true);
  };

  const deleteItem = (categorieUuid, photoUuid) => {
    const ENDPOINT = `/delete_categorie/${categorieUuid}/photo/${photoUuid}`;
    api
      .delete(ENDPOINT)
      .then((res) => {
        notifySuccess(`Catégorie Supprimée : ${res.data.nom}`);
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la suppression.");
        console.error(err.response.data);
      });
    setUpdate(true);
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
            id="sign-in"
            className="nouvelle-collection-button"
            type="submit"
            required
          >
            <p>Enregistrer la nouvelle catégorie</p>
          </button>
        </form>
      </div>
      <hr/>
      <div>
        <h2>Categories existantes</h2>
        {categories.map((categorie, index) => 
          <form
            key={index}
            method="put"
            onSubmit={(e) => handleModifSubmit(e, categorie.num_categories)}
            id={`modif-form-${categorie.num_categories}`}
          />
        ) }
        <table id="existant">
          <tr>
            <th>id</th>
            <th>Priorité d'affichage</th>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          {categories.map((categorie, index) => 
            <tr key={index}>
              <td>
                <p>{categorie.num_categories}</p>
              </td>
              <td>
                { modif === categorie.num_categories
                  ?<label
                    className="nouvelle_collection_label"
                    htmlFor="categorie_priorité"
                  >
                    <input
                      className="modif_collection_number"
                      form={`modif-form-${categorie.num_categories}`}
                      type="number"
                      name="priorité"
                      id="categorie_priorité"
                      defaultValue={categorie.priorité}
                      onChange={(e) => handleModifChange(e)}
                    />
                  </label>
                  :<p>{categorie.priorité}</p>
                }
              </td>
              <td>
                { modif === categorie.num_categories
                  ? <div className="nouvelle_collection">
                    <UploadImageForm
                      imageFile={imageModifFile}
                      setImageFile={setImageModifFile}
                      defaultPhoto={categorie.lien}
                    />
                  </div>
                  :<img src={categorie.lien} className="logo-categorie" alt={categorie.nom} />
                }
                
              </td>
              <td>
                { modif === categorie.num_categories
                  ?<label
                    className="nouvelle_collection_label"
                    htmlFor="categorie_nom"
                  >
                    <input
                      className="modif_collection_text"
                      form={`modif-form-${categorie.num_categories}`}
                      type="text"
                      name="nom"
                      id="categorie_nom"
                      defaultValue={categorie.nom}
                      onChange={(e) => handleModifChange(e)}
                    />
                  </label>
                  :<p>{categorie.nom}</p>
                }
                
              </td>
              <td>
                { modif === categorie.num_categories
                  ?<label
                    className="modif_collection_label"
                    htmlFor="categorie_description"
                  >
                    <textarea
                      className="modif_collection_textarea"
                      form={`modif-form-${categorie.num_categories}`}
                      rows={5}
                      name="description"
                      id="categorie_description"
                      defaultValue={categorie.description}
                      onChange={(e) => handleModifChange(e)}
                    />
                  </label>
                  : <p>{categorie.description}</p>
                }
              
              </td>
              <td>
                { modif === categorie.num_categories
                  ?<>
                    <button
                      type="submit"
                      form={`modif-form-${categorie.num_categories}`}
                    >
                      <MdSave />
                    </button>
                    <MdClose 
                      onClick={() => setModif("")}
                    />
                  </>
                  : <> 
                    <MdModeEditOutline
                      onClick={() => setModif(categorie.num_categories)}
                    />
                    <MdDeleteForever
                      onClick={() => deleteItem(categorie.num_categories, categorie.num_photos)}
                    />
                  </>
                }

              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};