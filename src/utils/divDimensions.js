export const mobileHeaderHeight = 20;

export const mobileFooterHeight = 20;

export const mobileNavBarLineHeight = (nbCategories) => {
  //based on a header height of 15vh (see header.css)
  return (
    (100 - mobileHeaderHeight)/(nbCategories+1)
  );
};