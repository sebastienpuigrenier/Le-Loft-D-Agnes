export const DashboardCellPriorite = ({uuid, modif, item, handleModifChange}) => {

  return (

    <div className="table-existant__row-item"
      id="table-existant__row-priorité"
    >
      { modif === uuid
        ?<label
          className="nouvelle_collection_label"
          htmlFor="categorie_priorité"
        >
          <input
            className="modif_collection_number"
            type="number"
            name="priorité"
            id="categorie_priorité"
            defaultValue={item.priorité}
            onChange={(e) => handleModifChange(e)}
          />
        </label>
        :<p>{item.priorité}</p>
      }
    </div>
  );
};