import { NavLink } from "react-router-dom";
import "./dashboard-menu.css";

export const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <NavLink to={"/dashboard"}>
        <h2
          role="button"
          tabIndex={0}
          className="dashboard-menu-button"
        >
           Home
        </h2>          
      </NavLink>
      <NavLink to={"/dashboard/categories"}>
        <h2
          role="button"
          tabIndex={1}
          className="dashboard-menu-button"
        >
            Catégories
        </h2>          
      </NavLink>
      <NavLink to={"/dashboard/produits"}>
        <h2
          role="button"
          tabIndex={2}
          className="dashboard-menu-button"
        >
            Produits
        </h2>          
      </NavLink>
      <NavLink to={"/dashboard/polices"}>
        <h2
          role="button"
          tabIndex={3}
          className="dashboard-menu-button"
        >
            Polices
        </h2>          
      </NavLink>
      <NavLink to={"/dashboard/cuirs"}>
        <h2
          role="button"
          tabIndex={4}
          className="dashboard-menu-button"
        >
            Cuirs
        </h2>          
      </NavLink>
    </div>
  );
};