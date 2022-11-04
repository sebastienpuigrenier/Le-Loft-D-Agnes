import { useState } from "react";
import { Hamburger } from "../../atomes/hamburger/hamburger";
import { MobileNavbar } from "../mobile-navbar/mobile-navbar";
import { mobileHeaderHeight } from "../../../utils/divDimensions";
import "./header.css";

export const Header = () => {
  const styleHeight = {
    "--height" : `${mobileHeaderHeight}vh`
  };
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleClick = () => {
    setIsMenuActive(!isMenuActive);
  };


  return(
    <>
      <header
        className={isMenuActive ? "active" : ""}
        style={styleHeight}
      >
        <div className="header-container">
          <h1>Le Loft d'Agnès</h1>
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