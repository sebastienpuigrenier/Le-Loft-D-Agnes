import Categories from "../../../fakeData/Categorie.json";
import { mobileNavBarLineHeight } from "../../../utils/divDimensions";
import { MobileNavbarLine } from "../../molecules/mobile-navbar-line/mobile-navbar-line";

import "./mobile-navbar.css";

export const MobileNavbar = ({headerHeight, handleClick}) => {

  const lineHeight = mobileNavBarLineHeight(Categories.length);

  return (
    <div>
      {Categories.map((categorie, index) => {
        const top = headerHeight + (index * lineHeight);
        return(
          <MobileNavbarLine
            key={index}
            titre = {categorie.nom}
            height={lineHeight}
            top = {top}
            handleClick={handleClick}
          />
        );
      })
      }
      
      <MobileNavbarLine
        key="contact"
        titre = "Contact"
        height={lineHeight}
        top = {headerHeight + (Categories.length * lineHeight)}
        handleClick={handleClick}
      />

    </div>

  );
};