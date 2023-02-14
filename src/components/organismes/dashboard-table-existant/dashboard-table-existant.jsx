import { DashboardLineCollection } from "../../molecules/dashboard-table-line/dashboard-line";

import "./dashboard-table-existant.css";

export const DashboardTableExistant = ({collection, setUpdate}) => {
  return (
    <>
      <h2>Categories existantes</h2>
      <div
        className="table-container"
      >
        <div
          className="table-existant__row table-existant__header"
        >
          <div
            className="table-existant__row-item"
            id="table-existant__row-id"
          >
            <h4>id</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-priorité"
          >
            <h4>Priorité d'affichage</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-image"
          >
            <h4>Image</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-nom"
          >
            <h4>Nom</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-description"
          >
            <h4>Description</h4>
          </div>
          <div className="table-existant__row-item"
            id="table-existant__row-action"
          >
            <h4>Actions</h4>
          </div>
        </div>
        <DashboardLineCollection 
          collection = {collection}
          setUpdate = {setUpdate}
        />
          
      </div>
    </>
  );
};