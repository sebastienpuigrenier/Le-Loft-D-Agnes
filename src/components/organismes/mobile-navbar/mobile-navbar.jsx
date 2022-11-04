import Categories from "../../../fakeData/Categorie.json";
import { mobileNavBarLineHeight } from "../../../utils/divDimensions";
import { MobileNavbarLine } from "../../molecules/mobile-navbar-line/mobile-navbar-line";

import "./mobile-navbar.css";

export const MobileNavbar = ({isMenuActive, headerHeight, handleClick}) => {

  const lineHeight = mobileNavBarLineHeight(Categories.length);

  return (
    <>
      {Categories.map((categorie, index) => {
        const top = headerHeight + (index * lineHeight);
        return(
          <MobileNavbarLine
            key={index}
            titre = {categorie.nom}
            height={lineHeight}
            isMenuActive={isMenuActive}
            top = {top}
            handleClick={handleClick}
          />
        );
      })
      }

    </>

  );
};