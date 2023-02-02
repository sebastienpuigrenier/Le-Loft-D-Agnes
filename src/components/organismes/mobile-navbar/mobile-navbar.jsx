import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { mobileNavBarLineHeight } from "../../../utils/divDimensions";
import { MobileNavbarLine } from "../../molecules/mobile-navbar-line/mobile-navbar-line";

import "./mobile-navbar.css";

export const MobileNavbar = ({headerHeight, handleClick}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const ENDPOINT_CATEGORIES = "/browse_categories";
    
    api
      .get(ENDPOINT_CATEGORIES)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const lineHeight = mobileNavBarLineHeight(categories.length);

  return (
    <div className="mobilenavbar-container">
      {categories.map((categorie, index) => {
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
        top = {headerHeight + (categories.length * lineHeight)}
        handleClick={handleClick}
      />

    </div>

  );
};