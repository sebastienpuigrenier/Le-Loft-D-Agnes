import { mobileFooterHeight, mobileHeaderHeight } from "../../utils/divDimensions";
export const Categorie = ({titre}) => {
  const minHeight = 100 - mobileFooterHeight - mobileHeaderHeight;
  return (
    <div
      style={{minHeight: `${minHeight}vh`}}
    >
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
      <p>{titre}</p>
    </div>
  );
};