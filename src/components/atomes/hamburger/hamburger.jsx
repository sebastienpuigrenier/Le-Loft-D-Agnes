import "./hamburger.css";

export const Hamburger = ({handleClick, isMenuActive}) => {

  return(
    <div id="burger-menu"
      className={isMenuActive ? "active" : ""}
      onClick={handleClick}
    >
      <div className="hamburger"/>
    </div>
  );
};
