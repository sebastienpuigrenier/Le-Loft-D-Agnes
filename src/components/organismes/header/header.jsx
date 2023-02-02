
import { api } from "../../../utils/api";
import { Hamburger } from "../../atomes/hamburger/hamburger";
import { MobileNavbar } from "../mobile-navbar/mobile-navbar";
import { mobileHeaderHeight } from "../../../utils/divDimensions";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { mobileNavBarLineHeight } from "../../../utils/divDimensions";
import { useContext } from "react";
import ExportContext from "../../../contexts/context";
import { useEffect, useState } from "react";

export const Header = () => {
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
  let navigate = useNavigate();
  const lineHeight = mobileNavBarLineHeight(categories.length);
  const headerHeight = {
    "--height" : `${mobileHeaderHeight}vh`,
    "--title-height" : `calc(2 * ${lineHeight}px)`
  };
  const {isMenuActive, setIsMenuActive} = useContext(ExportContext.Context);
  const [isMini, setIsMini] = useState( false);

  const handleClick = () => {
    window.scrollTo(0, 0);
    setIsMenuActive(!isMenuActive);
  };

  const handleScroll = () => {
    if(window.pageYOffset > 80) {
      setIsMini(true);
    } else {
      setIsMini(false);
    }
  };
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return(
    <>
      <header
        className={(isMini ? "mini " : " ") + (isMenuActive ? "active" : "")}
        style={headerHeight}
      >
        <div className="header-container">
          <div className="grid-h1">
            <h1
              className={isMenuActive ? "active" : "" + " clickable "}
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