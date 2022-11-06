import { AiFillMail, AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import "./footer.css";
import svgLogo from "../../../img/le-loft-d-agnes-logo.svg";
import { mobileFooterHeight } from "../../../utils/divDimensions";

export const Footer =() => {
  const footerHeight = {
    "--height" : `calc(${mobileFooterHeight} * var(--vh))`
  };

  return(
    <footer
      style={footerHeight}
    >
      <div>
        <img id="svglogo" src={svgLogo} alt="Le loft d'Agnès"/>
      </div>
      <div>
        <p>Création de planche apéro, meubles et autres objets déco personnalisées.</p>
      </div>
      <div id="social-media">
        <ul>
          <li><a href="mailto: agnes.guichet@sfr.fr"><AiFillMail /></a></li>
          <li><a href="https://www.facebook.com/leloftdagnes"><AiFillFacebook /></a></li>
          <li><a href="https://www.instagram.com/leloftdagnes/?hl=fr"><AiFillInstagram /></a></li>
        </ul>
      </div>
    </footer>
  );
};