import GroupTable from "../GroupTable";

import { faInfoCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Payments = () => {
  const info = {
    headers: ["Album", "Name of bank", "Account number"],
    rows: [["111111", "Bank Test SA", "49 1020 2892 2276 3005 0000 0000"]],
  };

  const account = {
    headers: ["Bank name", "Account number", "Currency", "Confirmed"],
    rows: [
      ["Test I O. Warsaw", "49 1020 2892 2276 3005 0000 0000", "USD", "Yes"],
      ["Test I O. Warsaw", "49 1020 2892 2276 3005 0000 0000", "PLN", "Yes"],
    ],
  };

  const charges = {
    headers: ["Title", "Value", "Due date"],
    rows: [
      ["Activation of student card", "4.99 $", "25.04.2022"],
      ["Activation of student card", "4.99 $", "25.04.2022"],
    ],
  };

  return (
    <section
      className="payments-section"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <GroupTable title="University information" object={info} />
      <GroupTable
        title="Your bank accounts"
        icon={faPlusCircle}
        object={account}
      />
      <GroupTable title="Your charges" icon={faInfoCircle} object={charges} />
    </section>
  );
};

export default Payments;
