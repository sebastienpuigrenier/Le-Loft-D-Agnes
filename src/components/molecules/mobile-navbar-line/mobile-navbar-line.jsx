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
        height: `${height}vh`,
        fontSize: `${height}px`,
        top: `${top}vh`
      }}
      onClick={currentHandleClick}
    >
      {titre}
    </div>
  );
};