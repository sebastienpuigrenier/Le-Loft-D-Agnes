import { useNavigate } from "react-router-dom";
import "./summary-product.css";

export const SummaryProduct = ({produit}) => {
  let navigate = useNavigate();



  return (
    <div
      className="summary-product-container"
      onClick={() => navigate(`/${produit.nom}`)}
    >
      <img src={produit.photo}/>
      <h4>{produit.nom}</h4>
    </div>
  );
};