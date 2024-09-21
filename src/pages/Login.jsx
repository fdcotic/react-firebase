import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";


import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import PhotoIcon from '@mui/icons-material/AddAPhoto';

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
    <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
        <PhotoIcon></PhotoIcon>
      </Avatar>
      <Typography variant="h5" component={"h1"}>
        Login
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
          <Box onSubmit={handleSubmit} sx={{ mt: 1 }} component="form">
            <TextField
              type="text"
              placeholder="mail@mail.com"
              value={values.email}
              onChange={handleChange}
              name="email"
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
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Ingrese contraseña"
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
            variant ="contained"
            fullWidth
            sx={{mb:3}}
            >
              Acceder
            </LoadingButton>

            <Button 
            fullWidth
            component={Link}
            to="/register">
              No tienes cuenta? Registrate
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
