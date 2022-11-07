import "./hamburger.css";
import { useContext } from "react";
import ExportContext from "../../../contexts/context";

export const Hamburger = ({handleClick}) => {
  
  const {isMenuActive} = useContext(ExportContext.Context);

  return(
    <div id="burger-menu"
      className={isMenuActive ? "active" : ""}
      onClick={handleClick}
    >
      <div className="hamburger"/>
    </div>
  );
};
