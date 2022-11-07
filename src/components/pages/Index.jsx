//import logo from '../../logo.svg';
import Categories from "../../fakeData/Categorie.json";
import { IndexCategorieLine } from "../molecules/index-categorie-line/index-categorie-line";
// import { Categorie } from './Categorie';

export const Index = () => {
  
  return (
    <div className="index-main-container">
      {Categories.map((categorie, index) => {
        return (
          <IndexCategorieLine
            key={index}
            categorie={categorie}
          />
        );
      })}
    </div>
  );
};

export default Index;
