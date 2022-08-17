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
import { validate } from "../../utility/validate";
import Dropdown from "../Dropdown";

const initialBank = {
  bankName: "",
  accountNumber: "",
  currency: "",
};

const Payments = () => {
  const [accountModal, setAccountModal] = useState(false);
  const [t] = useTranslation("translation");
  const [student, setStudent] = useState();
  const [bankAccount, setBankAccount] = useState({ ...initialBank });
  const [errors, setErrors] = useState({ ...initialBank });
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
    headers: [
      t("payments.title"),
      t("payments.value"),
      t("payments.dueDate"),
      "Payed",
    ],
    keys: ["title", "value", "due", "payed"],
  };

  const inputs = [
    {
      label: "Account number",
      name: "accountNumber",
      type: "number",
      regex: /^[0-9]{26}$/,
      error: "Account number should be in valid format",
    },
    {
      label: "Bank name",
      name: "bankName",
      regex: /^[a-zA-Z]+$/,
      error: "Bank name should contain only letters",
    },
  ];

  const currency = [
    { _id: "1", name: "PLN" },
    { _id: "2", name: "USD" },
    { _id: "3", name: "EUR" },
  ];

  // Adding account on subbmiting form inside modal
  const onAddAccount = async (e) => {
    e.preventDefault();

    let validateErrors = {};

    // Validating all inputs and dropdowns
    inputs.forEach((input) => {
      const error = validate(
        input.name,
        bankAccount[input.name],
        input.regex,
        input.error
      );
      validateErrors[error.name] = error.msg;
    });

    if (bankAccount.currency === "") {
      validateErrors["currency"] = "Please choose one of the currencies";
    }

    setErrors({ ...errors, ...validateErrors });

    // Check if there is any error
    for (const error of Object.values(validateErrors)) {
      if (error !== "") {
        return;
      }
    }

    try {
      const response = await axiosPrivate.post(
        "users/account",
        JSON.stringify({
          ...bankAccount,
          currency: bankAccount.currency.name,
        })
      );
      setStudent({ ...student, accounts: response.data.accounts });
      setAccountModal(!accountModal);
      setErrors({ ...initialBank });
      successToast("Successfully added bank account");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  return (
    <section
      className="payments-section"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Modal
        title={"Add bank account"}
        show={accountModal}
        onClose={() => setAccountModal(!accountModal)}
        footer={"*Bank account will be checked in two working days"}
      >
        <form onSubmit={onAddAccount}>
          {inputs.map((input, i) => (
            <Input
              key={`accounts-input-${i}`}
              {...input}
              label={input.label}
              name={input.name}
              error={errors[input.name]}
              onChange={(e) => {
                const error = validate(
                  input.name,
                  e.target.value,
                  input.regex,
                  input.error
                );
                setBankAccount({
                  ...bankAccount,
                  [e.target.name]: e.target.value,
                });
                setErrors({
                  ...errors,
                  [e.target.name]: error.msg,
                });
              }}
            />
          ))}
          <Dropdown
            state={bankAccount.currency.name}
            setState={(currency) => {
              setErrors({ ...errors, currency: "" });
              setBankAccount({ ...bankAccount, currency: currency });
            }}
            options={currency}
            error={errors.currency}
          />
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
          setAccountModal(!accountModal);
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
