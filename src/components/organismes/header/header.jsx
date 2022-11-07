import { Hamburger } from "../../atomes/hamburger/hamburger";
import { MobileNavbar } from "../mobile-navbar/mobile-navbar";
import { mobileHeaderHeight } from "../../../utils/divDimensions";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { mobileNavBarLineHeight } from "../../../utils/divDimensions";
import Categories from "../../../fakeData/Categorie.json";
import { useContext } from "react";
import ExportContext from "../../../contexts/context";

export const Header = () => {
  const lineHeight = mobileNavBarLineHeight(Categories.length);
  const headerHeight = {
    "--height" : `calc(${mobileHeaderHeight} * var(--vh))`,
    "--title-height" : `calc(2 * ${lineHeight}px)`
  };
  const {isMenuActive, setIsMenuActive} = useContext(ExportContext.Context);

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
          <div className="grid-h1">
            <h1
              className={isMenuActive ? "active" : ""}
              onClick={() => {
                navigate("");
                isMenuActive ? setIsMenuActive(!isMenuActive) : null;
              }}
            >
              Le&nbsp;Loft&nbsp;d'Agnès
            </h1>
          </div>
          <div className="grid-hamburger">
            <Hamburger
              handleClick={handleClick}
            />
          </div>
        </div>
      </header>
      <nav>
        <MobileNavbar 
          handleClick={handleClick}
          headerHeight={mobileHeaderHeight}
        />
      </nav>
    </>
  );
};