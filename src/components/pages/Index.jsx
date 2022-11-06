//import logo from '../../logo.svg';
import Categories from "../../fakeData/Categorie.json";
import { IndexCategorieLine } from "../molecules/index-categorie-line/index-categorie-line";
// import { Categorie } from './Categorie';

function Index() {
  
  return (
    <>
      {Categories.map((categorie, index) => {
        return (
          <IndexCategorieLine
            key={index}
            categorie={categorie}
          />
        );
      })}
    </>
  );
}

export default Index;
