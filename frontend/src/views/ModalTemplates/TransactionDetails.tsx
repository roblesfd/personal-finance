import { Formik } from "formik";
import * as Yup from "yup";
import { categoriesData, methodsData } from "../../utils/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faCalendarPlus,
  faCancel,
  faCreditCard,
  faEdit,
  faMoneyBill1Wave,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import ModalContext from "../../context/modalContext";

const initialValues = {
  name: "",
  amount: 0,
  description: "",
  category: "",
  date: "",
  method: "",
};

const checkoutSchema = Yup.object().shape({
  name: Yup.string().required("Este campo es obligatorio"),
  amount: Yup.number()
    .required("Este campo es obligatorio")
    .min(1, "El monto debe ser mayor a 0")
    .max(500000, "El monto no debe exceder 500,000"),
  description: Yup.string().required("Este campo es obligatorio"),
  category: Yup.string().required("Este campo es obligatorio"),
  date: Yup.string().required("Este campo es obligatorio"),
  method: Yup.string().required("Este campo es obligatorio"),
});

const TransactionDetails = () => {
  // const {} = data;
  const { modal, setModal } = useContext(ModalContext);
  const [isEditMode, setIsEditMode] = useState(false);
  let content: React.ReactElement;

  const categoryOptions = categoriesData.map((category) => (
    <option value={`${category.id}`} key={`${category.id}`}>
      {category.name}
    </option>
  ));

  const methodOptions = methodsData.map((category) => (
    <option value={`${category.id}`} key={`${category.id}`}>
      {category.name}
    </option>
  ));

  const handleModalClose = () => {
    setModal({
      isOpen: false,
      content: null,
    });
  };

  const onSaveUserClicked = (values) => {
    console.log(values);
  };

  if (isEditMode) {
    content = (
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={(values) => {
          onSaveUserClicked(values);
        }}
      >
        {(formik) => {
          const { handleSubmit } = formik;

          return (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 gap-x-4">
                <div className="mb-4 col-span-2">
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="name"
                  >
                    Nombre
                  </label>
                  <input
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700   leading-tight  ${
                      formik.touched.name &&
                      formik.errors.name &&
                      "outline  outline-red-400"
                    }
                      ${
                        formik.touched.name &&
                        !formik.errors.name &&
                        "outline  outline-green-300"
                      }
                      `}
                    id="name"
                    type="text"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div
                      className={` text-sm mt-2 ${
                        formik.touched.name &&
                        formik.errors.name &&
                        "text-red-500"
                      }`}
                    >
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4 col-span-2">
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="amount"
                  >
                    Monto
                  </label>
                  <input
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700   leading-tight  ${
                      formik.touched.amount &&
                      formik.errors.amount &&
                      "outline  outline-red-400"
                    }
                    ${
                      formik.touched.amount &&
                      !formik.errors.amount &&
                      "outline  outline-green-300"
                    }
                  `}
                    id="amount"
                    type="text"
                    value={formik.values.amount}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <div
                      className={` text-sm mt-2 ${
                        formik.touched.amount &&
                        formik.errors.amount &&
                        "text-red-500"
                      }`}
                    >
                      {formik.errors.amount}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4 col-span-4">
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="description"
                  >
                    Descripción
                  </label>
                  <textarea
                    className={`shadow border rounded-md w-full py-2 px-3 text-gray-700   leading-tight resize-none  ${
                      formik.touched.description &&
                      formik.errors.description &&
                      "outline  outline-red-400"
                    }
            ${
              formik.touched.description &&
              !formik.errors.description &&
              "outline  outline-green-300"
            }
          `}
                    id="description"
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    rows={5}
                  >
                    {formik.touched.description && formik.errors.description ? (
                      <div
                        className={` text-sm mt-2 ${
                          formik.touched.description &&
                          formik.errors.description &&
                          "text-red-500"
                        }`}
                      >
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </textarea>
                </div>
                <div className="mb-4 col-span-4 md:col-span-1">
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="category"
                  >
                    Categoría
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    className={`shadow-md border rounded-md w-full py-2 px-3 text-sm text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.category && formik.errors.category
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                  >
                    {categoryOptions}
                  </select>
                </div>
                <div className="mb-4 col-span-4 md:col-span-1">
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="method"
                  >
                    Método
                  </label>
                  <select
                    name="method"
                    id="method"
                    value={formik.values.method}
                    onChange={formik.handleChange}
                    className={`shadow-md border rounded-md w-full py-2 px-3 text-sm text-gray-700 dark:text-primary-50 dark:bg-primary-970 leading-tight  ${
                      formik.touched.method && formik.errors.method
                        ? "outline  outline-red-400"
                        : ""
                    }`}
                  >
                    {methodOptions}
                  </select>
                </div>
                <div className="mb-4 col-span-4 md:col-span-1">
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="date"
                  >
                    Fecha
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formik.values.date}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    min="2024-01-01"
                    max="2024-12-31"
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-between mt-8">
                {/* <button
                  type="submit"
                  className="w-full bg-primary-400 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Añadir
                </button> */}
              </div>
            </form>
          );
        }}
      </Formik>
    );
  } else {
    content = (
      <div className="w-[240px] h-[200px] mx-auto flex justify-center items-center">
        <ul className="space-y-2">
          <li className="grid grid-cols-4 gap-2">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="text-green-400"
              />
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Monto:</span>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-sm underline decoration-2 underline-offset-2 under">
                500.50 MXN
              </span>
            </div>
          </li>
          <li className="grid grid-cols-4 gap-2">
            <div className="col-span-1">
              <FontAwesomeIcon icon={faCreditCard} className="text-green-400" />
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Método:</span>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-sm ">Tarjeta de crédito</span>
            </div>
          </li>
          <li className="grid grid-cols-4 gap-2">
            <div className="col-span-1">
              <FontAwesomeIcon icon={faReceipt} className="text-green-400" />
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Categoría:</span>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-sm ">Salario</span>
            </div>
          </li>
          <li className="grid grid-cols-4 gap-2">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faCalendarPlus}
                className="text-green-400"
              />
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Fecha:</span>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-sm ">16/10/2024</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  /*
nombre
monto
descripcion
metodo
categoria
fecha
*/

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full rounded  pt-4 text-primary-950">
        <h2 className="text-xl font-bold text-center mb-8">
          Nombre de transacción
        </h2>
        {content}
        <div className="w-full flex justify-end items-end gap-4 mt-10">
          <button
            className="w-26 bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <span className="mr-3">{isEditMode ? "Guardar" : "Editar"}</span>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="w-26 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
            onClick={handleModalClose}
          >
            <span className="mr-3">Cerrar</span>
            <FontAwesomeIcon icon={faCancel} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
