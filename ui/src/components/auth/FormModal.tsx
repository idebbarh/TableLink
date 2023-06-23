import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

interface Field {
  name: string;
  type: string;
  value: string | number;
}
interface FormModal {
  returnData: (data: FormValues) => void;
  modalTitle: string;
  submitBtnTitle: string;
  fields: Field[];
  closeModal: () => void;
}
type FormValues =
  | { name: string; email: string; password: string }
  | {
      name: string;
      description: string;
      ingredients: string;
      price: number;
    };

function FormModal({
  fields,
  closeModal,
  modalTitle,
  submitBtnTitle,
  returnData,
}: FormModal) {
  const [formValues, setFromValues] = useState<FormValues>(() => {
    let res = {} as FormValues;
    fields.forEach((field) => {
      res = { ...res, [field.name]: field.value };
    });
    return res;
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormValues;
    const value = e.target.value as string;
    setFromValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    returnData(formValues);
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
      <h1 className="text-2xl font-bold capitalize">{modalTitle}</h1>
      <form className="mt-4" onSubmit={submitHandler}>
        {fields.map((field, index) => {
          return (
            <div className="flex flex-col mb-4" key={index}>
              <label htmlFor={field.name} className="capitalize">
                {field.name}
              </label>
              <input
                name={field.name}
                type={field.type}
                id={field.name}
                className="border border-solid border-gray-300 p-2 rounded-md"
                value={formValues[field.name as keyof FormValues]}
                onChange={changeHandler}
                required={true}
              />
            </div>
          );
        })}
        <button className="capitalize bg-mainBlue text-white px-4 py-2 rounded-md">
          {submitBtnTitle}
        </button>
      </form>
    </motion.div>
  );
}

export default FormModal;
