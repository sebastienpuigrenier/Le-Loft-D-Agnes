import { useNavigate } from "react-router-dom";
import "./summary-product.css";

export const SummaryProduct = ({produit}) => {
  let navigate = useNavigate();


  return (
    <div
      className="summary-product-container clickable"
      onClick={() => navigate(`/${produit.nom}`)}
    >
      <img src={produit.lien}/>
      <h5>{produit.nom}</h5>
    </div>
  );
};