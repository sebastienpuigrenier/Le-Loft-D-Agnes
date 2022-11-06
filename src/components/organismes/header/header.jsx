import { useState } from "react";
import { Hamburger } from "../../atomes/hamburger/hamburger";
import { MobileNavbar } from "../mobile-navbar/mobile-navbar";
import { mobileHeaderHeight } from "../../../utils/divDimensions";
import "./header.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const headerHeight = {
    "--height" : `calc(${mobileHeaderHeight} * var(--vh))`
  };
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  let navigate = useNavigate();


  return(
    <>
      <header
        className={isMenuActive ? "active" : ""}
        style={headerHeight}
      >
        <div className="header-container">
          <h1 onClick={() => navigate("")}>Le Loft d'Agnès</h1>
          <Hamburger
            handleClick={handleClick}
            isMenuActive={isMenuActive} />
        </div>
      </header>
      <nav>
        <MobileNavbar 
          handleClick={handleClick}
          isMenuActive={isMenuActive}
          headerHeight={mobileHeaderHeight}
        />
      </nav>
    </>
  );
};