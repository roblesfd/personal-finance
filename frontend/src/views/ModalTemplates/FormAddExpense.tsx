import { Formik } from "formik";
import * as Yup from "yup";
import { categoriesData, methodsData } from "../../utils/mockData";

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

const FormAddExpense = () => {
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

  const onSaveUserClicked = (values) => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full rounded px-8 pt-4 pb-8 text-primary-950">
        <h2 className="text-xl font-bold text-center mb-8">Añadir un gasto</h2>
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
                      {formik.touched.description &&
                      formik.errors.description ? (
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
                  <button
                    type="submit"
                    className="w-full bg-primary-400 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Añadir
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default FormAddExpense;
