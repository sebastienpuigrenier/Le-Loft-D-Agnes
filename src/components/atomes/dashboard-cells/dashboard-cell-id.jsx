export const DashboardCellId = ({uuid}) => {

  return (
    <div
      className="table-existant__row-item"
      id="table-existant__row-id"
    >
      <p id="table-existant__id">{uuid}</p>
    </div>
  );
};