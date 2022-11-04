export const mobileHeaderHeight = 15;

export const mobileFooterHeight = 15;

export const mobileNavBarLineHeight = (nbCategories) => {
  //based on a header height of 15vh (see header.css)
  return (
    (100 - mobileHeaderHeight)/nbCategories
  );
};