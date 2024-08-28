import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { useAddNewUserMutation } from "../user/userApiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const passwordRegExp = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;

const initialValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};

const checkoutSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "6 carácteres mínimo")
    .max(20, "20 carácteres máximo")
    .required("Este campo es obligatorio"),
  lastName: Yup.string()
    .min(6, "6 carácteres mínimo")
    .max(20, "20 carácteres máximo")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .required("Este campo es obligatorio")
    .min(8, "8 carácteres mínimo")
    .max(18, "18 carácteres máximo")
    .matches(
      passwordRegExp,
      "Al menos una letra, un número y un carácter especial"
    ),
  email: Yup.string()
    .email("Dirección de correo inválida")
    .required("Este campo es obligatorio"),
});

const Signup = () => {
  const [addNewUser] = useAddNewUserMutation();
  const [isAccountCreatedSuccessfully, setIsAccountCreatedSuccessfully] =
    useState(false);

  const onSaveUserClicked = async (e, formik) => {
    e.preventDefault();
    const values = formik.values;
    const result = await addNewUser({ ...values });
    if (result.error) {
      toast.error("Error al crear la cuenta");
    } else {
      toast.success("Tu cuenta de usuario ha sido creada");
      formik.resetForm();
      setIsAccountCreatedSuccessfully(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 dark:bg-secondary-900 dark:text-secondary-50">
      <div className="max-w-md w-full  px-8 py-8 bg-white dark:bg-primary-800">
        {!isAccountCreatedSuccessfully ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Regístro de cuenta
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {(formik) => {
                return (
                  <form onSubmit={(e) => onSaveUserClicked(e, formik)}>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Nombre
                      </label>
                      <input
                        className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight  ${
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
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
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
                    <div className="mb-4">
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="lastName"
                      >
                        Apellido
                      </label>
                      <input
                        className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight  ${
                          formik.touched.lastName &&
                          formik.errors.lastName &&
                          "outline  outline-red-400"
                        }
                    ${
                      formik.touched.lastName &&
                      !formik.errors.lastName &&
                      "outline  outline-green-300"
                    }
                    `}
                        id="lastName"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        required
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div
                          className={` text-sm mt-2 ${
                            formik.touched.lastName &&
                            formik.errors.lastName &&
                            "text-red-500"
                          }`}
                        >
                          {formik.errors.lastName}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Correo electrónico
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`shadow border rounded-md w-full py-2 px-3 text-gray-700  leading-tight  ${
                          formik.touched.email &&
                          formik.errors.email &&
                          "outline  outline-red-400"
                        }
                    ${
                      formik.touched.email &&
                      !formik.errors.email &&
                      "outline  outline-green-300"
                    }`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div
                          className={` text-sm mt-2 ${
                            formik.touched.email &&
                            formik.errors.email &&
                            "text-red-500"
                          }`}
                        >
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Contraseña
                      </label>
                      <input
                        id="password"
                        type="password"
                        className={`shadow border rounded-md w-full py-2 px-3 text-gray-700  leading-tight  ${
                          formik.touched.password &&
                          formik.errors.password &&
                          "outline  outline-red-400"
                        }
                    ${
                      formik.touched.password &&
                      !formik.errors.password &&
                      "outline  outline-green-300"
                    }`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div
                          className={` text-sm mt-2 ${
                            formik.touched.password &&
                            formik.errors.password &&
                            "text-red-500"
                          }`}
                        >
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between mt-8">
                      <button
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Registrarme
                      </button>
                      <Link
                        className="inline-block align-baseline font-bold text-sm text-primary-950"
                        to="/ingresar"
                      >
                        ¿Ya tienes una cuenta? Iniciar sesión
                      </Link>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </>
        ) : (
          <div className="text-center">
            <Link
              className="font-medium text-primary-950 hover:text-primary-700 text-xl"
              to="/ingresar"
            >
              Cuenta creada exitosamente ahora puedes{" "}
              <span className="font-extrabold">
                Iniciar sesión en tu cuenta
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
