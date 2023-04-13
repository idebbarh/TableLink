import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

type IPossibleData = IMenuItem & IEmployee;

interface FormModalProps {
  pageTitle: string;
  getData: (data: IPossibleData) => void;
  fields: { name: string; type: string }[];
  fieldsValue?: {
    [key: string]: {
      value: string;
      error: string | null;
    };
  };
  closeModal: () => void;
}
interface IFormModal {
  [key: string]: {
    value: string;
    error: string | null;
  };
}

function FormModal({
  pageTitle,
  getData,
  fields,
  fieldsValue,
  closeModal,
}: FormModalProps) {
  const [formData, setFormData] = useState<IFormModal | null>(
    fieldsValue !== undefined ? fieldsValue : null
  );

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newFormData: IFormModal = {};
    let isErrors = false;
    fields.forEach((field) => {
      if (
        formData === null ||
        formData[field.name] === undefined ||
        formData[field.name].value === ""
      ) {
        newFormData[field.name] = {
          value: "",
          error: field.name + " is required",
        };
        isErrors = true;
      } else {
        newFormData[field.name] = {
          ...formData[field.name],
        };
      }
    });

    if (isErrors) {
      setFormData(newFormData);
      return;
    }

    if (formData !== null && getData !== undefined) {
      let newData = {} as IPossibleData;
      for (let key in formData) {
        newData = { ...newData, [key]: formData[key].value };
      }
      getData(newData);
      closeModal();
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: {
          value,
          error: null,
        },
      };
    });
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="z-50 absolute -top-[80px] right-0 h-screen min-w-[400px] px-6 pb-6 pt-14 bg-gray-100 border-l-2 border-gray-300"
    >
      <div
        className="absolute right-4 top-4 cursor-pointer"
        onClick={closeModal}
      >
        <CloseIcon fontSize="large" />
      </div>
      <h1 className="text-2xl font-bold capitalize">{pageTitle}</h1>
      <form className="mt-4" onSubmit={submitHandler}>
        {fields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label htmlFor={field.name} className="capitalize">
              {field.name}
            </label>
            <input
              name={field.name}
              type={field.type}
              id={field.name}
              className="border border-solid border-gray-300 p-2 rounded-md"
              value={
                formData !== null && formData[field.name] !== undefined
                  ? formData[field.name].value
                  : ""
              }
              onChange={changeHandler}
            />
            {formData !== null &&
              formData[field.name] !== undefined &&
              formData[field.name].error !== null && (
                <p className="text-red-500 text-sm">
                  {formData[field.name].error}
                </p>
              )}
          </div>
        ))}
        <button className="bg-mainBlue text-white px-4 py-2 rounded-md">
          Add
        </button>
      </form>
    </motion.div>
  );
}

export default FormModal;
