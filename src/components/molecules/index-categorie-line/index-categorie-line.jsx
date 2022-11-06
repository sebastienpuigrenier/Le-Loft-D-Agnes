import { useNavigate } from "react-router-dom";
import "./index-categorie-line.css";

export const IndexCategorieLine = ({categorie}) => {
  let navigate = useNavigate();
  
  return (
    <div
      className="index-categorie-line"
      onClick={() => navigate(categorie.nom)}
    >
      <h2>{categorie.nom}</h2>
      <img src={categorie.photo} className="logo-categorie" alt={categorie.nom} />
      <div className="index-categorie-line-text-container">
        <p>{categorie.descriptif}</p>
      </div>
    </div>
  );
};