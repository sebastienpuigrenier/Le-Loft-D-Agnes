export const DashboardCellDescription = ({uuid, modif, item, handleModifChange}) => {

  return (
    <div className="table-existant__row-item"
      id="table-existant__row-description"
    >
      { modif === uuid
        ?<label
          className="modif_collection_label"
          htmlFor="categorie_description"
        >
          <textarea
            className="modif_collection_textarea"
            rows={5}
            name="description"
            id="categorie_description"
            defaultValue={item.description}
            onChange={(e) => handleModifChange(e)}
          />
        </label>
        : <p>{item.description}</p>
      }
    </div>
  );
};