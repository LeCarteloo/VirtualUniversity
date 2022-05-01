import { faFilter, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import GroupTable from "../GroupTable";
import TextInput from "../TextInput";
import Button from "../Button";
import Modal from "../Modal";

const Payments = () => {
  const [showModal, setShowModal] = useState(false);
  const [t] = useTranslation("translation");

  const info = {
    headers: ["Album", t("payments.bankName"), t("payments.accountNumber")],
    rows: [["111111", "Bank Test SA", "49 1020 2892 2276 3005 0000 0000"]],
  };

  const account = {
    headers: [
      t("payments.bankName"),
      t("payments.accountNumber"),
      t("payments.currency"),
      t("payments.confirmed"),
    ],
    rows: [
      ["Test I O. Warsaw", "49 1020 2892 2276 3005 0000 0000", "USD", "Yes"],
      ["Test I O. Warsaw", "49 1020 2892 2276 3005 0000 0000", "PLN", "Yes"],
    ],
  };

  const charges = {
    headers: [t("payments.title"), t("payments.value"), t("payments.dueDate")],
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
      <Modal
        title={"Add bank account"}
        show={showModal}
        onClose={() => setShowModal(!showModal)}
        footer={"*Bank account will be checked in two working days"}
      >
        <form>
          <TextInput label={"Account number"} />
          <TextInput label={"Bank name"} />
          <TextInput label={"Currency"} />
          <Button text={"Add bank"} />
        </form>
      </Modal>
      <GroupTable title={t("payments.uniInfo")} object={info} />
      <GroupTable
        title={t("payments.yourBank")}
        actionIcon={faPlusCircle}
        onAction={(e) => {
          e.stopPropagation();
          setShowModal(!showModal);
        }}
        object={account}
      />
      <GroupTable
        title={t("payments.yourCharges")}
        actionIcon={faFilter}
        object={charges}
      />
    </section>
  );
};

export default Payments;
