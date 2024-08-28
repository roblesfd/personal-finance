import { Formik } from "formik";
import * as Yup from "yup";
// import { useGetAUserQuery, useUpdateUserMutation } from "./usersApiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import toast from "react-hot-toast";

let initialValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};

const passwordRegExp = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;

const checkoutSchema = Yup.object().shape({
  name: Yup.string().required("Este campo es obligatorio"),
  lastName: Yup.string().required("Este campo es obligatorio"),
  email: Yup.string()
    .email("Dirección de correo inválida")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .required("Este campo es obligatorio")
    .min(8, "8 carácteres mínimo")
    .max(18, "18 carácteres máximo")
    .matches(
      passwordRegExp,
      "Al menos una letra, un número y un carácter especial"
    ),
});

const ProfileInfo = () => {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const onSaveUserClicked = async (values) => {
    // const result = await udpateUser({ ...values });
    // if (result.error) {
    //   toast.error(result.error.data.message);
    // } else {
    //   toast.success(result.data.message);
    // }
    setIsEditMode(false);
  };

  // const [udpateUser] = useUpdateUserMutation();

  // const {
  //   data: user,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetAUserQuery(id);

  let content;

  // if (isLoading) content = <p>Cargando...</p>;

  // if (isError) content = <p>{error?.data?.message}</p>;

  // if (isSuccess) {
  // initialValues = { ...initialValues, ...user };
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
          <div>
            {isEditMode ? (
              <form onSubmit={handleSubmit}>
                <h3 className="text-lg mb-8 font-semibold">
                  Editar información de mi cuenta
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-4">
                  <fieldset className="col-span-1 my-2 space-y-2 text-[14px]">
                    <label htmlFor="name">Nombre</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      {...formik.getFieldProps("name")}
                      className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-secondary-50 dark:bg-secondary-700 leading-tight  ${
                        formik.touched.name && formik.errors.name
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <p
                        className={` text-sm ${
                          formik.touched.name && formik.errors.name
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {formik.errors.name}
                      </p>
                    ) : null}
                  </fieldset>
                  <fieldset className="col-span-1 my-2 space-y-2 text-[14px]">
                    <label htmlFor="lastName">Apellido</label>
                    <input
                      id="lastName"
                      type="text"
                      namew="lastName"
                      {...formik.getFieldProps("lastName")}
                      className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-secondary-50 dark:bg-secondary-700 leading-tight  ${
                        formik.touched.lastName && formik.errors.lastName
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <p
                        className={` text-sm ${
                          formik.touched.lastName && formik.errors.lastName
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {formik.errors.lastName}
                      </p>
                    ) : null}
                  </fieldset>
                  <fieldset className="col-span-1 my-2 space-y-2 text-[14px]">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      type="text"
                      name="email"
                      {...formik.getFieldProps("email")}
                      className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-secondary-50 dark:bg-secondary-700 leading-tight  ${
                        formik.touched.email && formik.errors.email
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p
                        className={` text-sm ${
                          formik.touched.email && formik.errors.email
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </fieldset>
                  <fieldset className="col-span-1 my-2 space-y-2 text-[14px]">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 dark:text-secondary-50 dark:bg-secondary-700 leading-tight  ${
                        formik.touched.password && formik.errors.password
                          ? "outline  outline-red-400"
                          : ""
                      }`}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p
                        className={` text-sm ${
                          formik.touched.password && formik.errors.password
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </fieldset>
                </div>
                <div className="text-right mt-10">
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6"
                  >
                    Guardar cambios
                  </button>
                  <button
                    className="bg-secondary-400 hover:bg-secondary-500 dark:bg-secondary-200 dark:hover:bg-secondary-300  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setIsEditMode(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <section>
                <div className="flex justify-end items-center">
                  <button
                    className="bg-primary-700 hover:bg-primary-600 dark:bg-secondary-400 dark:hover:bg-secondary-500  text-primary-50 dark:text-secondary-50 shadow-md font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setIsEditMode(true)}
                  >
                    <span className="mr-4"> Editar cuenta</span>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
                <dl className="py-10 space-y-3">
                  <div className="flex justify-start items-center gap-4">
                    <dt className="font-semibold text-sm">Nombre:</dt>
                    <dd className="text-base">Fernando</dd>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                    <dt className="font-semibold text-sm">Apellido:</dt>
                    <dd className="text-base">Robles</dd>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                    <dt className="font-semibold text-sm">
                      Correo electrónico:
                    </dt>
                    <dd className="text-base">fernando@correo.com</dd>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                    <dt className="font-semibold text-sm">
                      Fecha de creación de cuenta:
                    </dt>
                    <dd className="text-base">16/Enero/2024 a las 18:26</dd>
                  </div>
                </dl>
              </section>
            )}
          </div>
        );
      }}
    </Formik>
  );
  // }

  return (
    <>
      <div>{content}</div>
    </>
  );
};

export default ProfileInfo;
