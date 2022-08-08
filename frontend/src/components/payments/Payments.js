import { faFilter, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Components
import GroupTable from "../GroupTable";
import Input from "../Input";
import Button from "../Button";
import Modal from "../Modal";
import { errorToast, successToast } from "../../utility/toast";

const Payments = () => {
  const [showModal, setShowModal] = useState(false);
  const [t] = useTranslation("translation");
  const [student, setStudent] = useState();
  const [bank, setBank] = useState({
    bankName: "",
    accountNumber: "",
    currency: "",
  });
  const [errors, setErrors] = useState();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getMyData = async () => {
      try {
        const response = await axiosPrivate.get("/users/data/me");
        setStudent(response.data);
      } catch (error) {
        errorToast(error?.response?.data?.message);
        navigate("/", { state: { from: location }, replace: true });
      }
    };
    getMyData();
  }, []);

  const uniInfo = {
    headers: ["Recipient", t("payments.bankName"), t("payments.accountNumber")],
    data: [
      "Virtual University",
      "Bank Test SA",
      "49 1020 2892 2276 3005 0000 0000",
    ],
  };

  const accounts = {
    headers: [
      t("payments.bankName"),
      t("payments.accountNumber"),
      t("payments.currency"),
      t("payments.confirmed"),
    ],
    keys: ["bankName", "accountNumber", "currency", "confirmed"],
  };

  const charges = {
    headers: [t("payments.title"), t("payments.value"), t("payments.dueDate")],
    keys: ["title", "value", "due", "payed"],
  };

  const onAddAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("users/account",
      JSON.stringify({

      })
      )
    } catch(error) {

    }
  }

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
        <form onSubmit={}>
          <Input label={"Account number"} />
          <Input label={"Bank name"} />
          <Input label={"Currency"} />
          <Button text={"Add bank"} />
        </form>
      </Modal>
      <GroupTable
        title={t("payments.uniInfo")}
        tableHeaders={uniInfo.headers}
        tableData={uniInfo.data}
      />
      <GroupTable
        title={t("payments.yourBank")}
        actionIcon={faPlusCircle}
        onAction={(e) => {
          e.stopPropagation();
          setShowModal(!showModal);
        }}
        tableHeaders={accounts.headers}
        tableData={student?.accounts}
        dataKeys={accounts.keys}
      />
      <GroupTable
        title={t("payments.yourCharges")}
        actionIcon={faFilter}
        tableHeaders={charges.headers}
        tableData={student?.payments}
        dataKeys={charges.keys}
      />
    </section>
  );
};

export default Payments;
