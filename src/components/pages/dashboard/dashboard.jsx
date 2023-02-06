import { Outlet } from "react-router-dom";
import { DashboardMenu } from "../../organismes/dashboard-menu/dashboard-menu";
import { mobileFooterHeight, mobileHeaderHeight } from "../../../utils/divDimensions";
import "./dashboard.css";

export const Dashboard = () => {
  const minHeight = 100 - mobileFooterHeight - mobileHeaderHeight;
  
  return(
    <div
      className="dashboard-container"
      style={{minHeight: `${minHeight}vh`}}
    >
      <DashboardMenu />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};