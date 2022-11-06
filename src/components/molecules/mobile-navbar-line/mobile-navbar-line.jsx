import { useNavigate } from "react-router-dom";

export const MobileNavbarLine = ({titre, height, isMenuActive, top, handleClick}) => {
  let navigate = useNavigate();

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