import {
  Card,
  CardContent,
  CardActions,
  Grid2 as Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material"
import { type FC } from "react"
import { ComponentVariantEnum } from "../../utils/enums/ComponentVariantEnum"
import { useFormik } from "formik"
import * as Yup from "yup"

export interface IForm {
  email: string
  password: string
}
type CardAuthProps = {
  title: string
  subTitle?: string
  buttonText?: string
  onSubmit: (val: IForm) => void
}

const validateErrorMessageSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato no valido")
    .required("el campo email es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("El campo contraseña es requerido"),
})

export const CardAuth: FC<CardAuthProps> = ({ title, subTitle, buttonText = 'Enviar', onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateErrorMessageSchema,
    onSubmit: val => {
      onSubmit(val)
    },
  })
  return (
    <Card sx={{ width: "30.5rem", maxHeight: "25rem" }}>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {subTitle && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {subTitle}
            </Typography>
          )}
          <Grid container my={2}>
            <Grid size={12} mb={3}>
              <TextField
                label="Email"
                id="email"
                name="email"
                variant={ComponentVariantEnum.STANDARD}
                fullWidth
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Contraseña"
                type="password"
                id="password"
                name="password"
                fullWidth
                variant={ComponentVariantEnum.STANDARD}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant={ComponentVariantEnum.CONTAINED}
            type="submit"
          >
            {buttonText}
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
