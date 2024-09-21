import { useState } from "react";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import PhotoIcon from '@mui/icons-material/AddAPhoto';
import { Link } from "react-router-dom";

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
    <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
        <PhotoIcon></PhotoIcon>
      </Avatar>
      <Typography variant="h5" component={"h1"}>
        Registro
      </Typography>
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
          <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
            <TextField
              type="text"
              placeholder="Ingrese email"
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              id="email"
              label="Ingrese Email"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />

            <TextField
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              id="password"
              label="Ingrese Password"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />
            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              sx={{ mb: 3 }}
            >
              Registrar
            </LoadingButton>

            <Button 
            fullWidth
            component={Link}
            to="/login">
              Ya tienes cuenta? Ingresa
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
