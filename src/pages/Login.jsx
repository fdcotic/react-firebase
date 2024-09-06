import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await login({ email: email, password: password });
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/invalid-credential") {
        setErrors({ email: "Usuario no registrado" });
      }
      if (error.code === "auth/wrong-password") {
        setErrors({ email: "Contraseña incorrecta" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("Password requerida"),
  });

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ingrese email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
            ></input>
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
            ></input>
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
