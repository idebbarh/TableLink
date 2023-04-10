import { FormEventHandler, useState } from "react";

interface FormModalProps {
  page: string;
  fields: string[];
}
interface IFormModal {
  [key: string]: {
    value: string;
    error: string | null;
  };
}

function FormModal({ page, fields }: FormModalProps) {
  const [formData, setFormData] = useState<IFormModal | null>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newFormData: IFormModal = {};
    let isErrors = false;
    fields.forEach((field) => {
      if (
        formData === null ||
        formData[field] === undefined ||
        formData[field].value === ""
      ) {
        newFormData[field] = {
          value: "",
          error: field + " is required",
        };
        isErrors = true;
      } else {
        newFormData[field] = {
          ...formData[field],
        };
      }
    });

    if (isErrors) {
      setFormData(newFormData);
      return;
    }

    console.log(formData);
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
    <div className="z-50 absolute -top-[80px] right-0 h-screen min-w-[400px] p-4 bg-gray-100 border-l-2 border-gray-300">
      <h1 className="text-2xl font-bold capitalize">add an {page}</h1>
      <form className="mt-4" onSubmit={submitHandler}>
        {fields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label htmlFor={field} className="capitalize">
              {field}
            </label>
            <input
              name={field}
              type="text"
              id={field}
              className="border border-solid border-gray-300 p-2 rounded-md"
              value={
                formData !== null && formData[field] !== undefined
                  ? formData[field].value
                  : ""
              }
              onChange={changeHandler}
            />
            {formData !== null &&
              formData[field] !== undefined &&
              formData[field].error !== null && (
                <p className="text-red-500 text-sm">{formData[field].error}</p>
              )}
          </div>
        ))}
        <button className="bg-mainBlue text-white px-4 py-2 rounded-md">
          Add
        </button>
      </form>
    </div>
  );
}

export default FormModal;
