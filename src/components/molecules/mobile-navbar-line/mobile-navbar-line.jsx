import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ExportContext from "../../../contexts/context";

export const MobileNavbarLine = ({titre, height, top, handleClick}) => {
  let navigate = useNavigate();
  const {isMenuActive} = useContext(ExportContext.Context);

  const currentHandleClick = () => {
    handleClick();
    navigate(titre);
  };

  return (
    <div
      className={`mobileNavbarLine ${isMenuActive ? "active" : ""}`}
      style={{
        height: `calc(${height} * var(--vh))`,
        fontSize: `calc(2 * ${height}px)`,
        top: `calc(${top} * var(--vh))`
      }}
      onClick={currentHandleClick}
    >
      {titre}
    </div>
  );
};