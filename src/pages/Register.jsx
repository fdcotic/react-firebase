import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {

  const {user} = useUserContext();

  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await register({
        email: email,
        password: password,
      });
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email Existente" });
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
      <h1>Register</h1>
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
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
             {errors.email && touched.email && errors.email}
            <input
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              ></input>
            {errors.password && touched.password && errors.password}

            <button type="submit" disabled={isSubmitting}>Register</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;
