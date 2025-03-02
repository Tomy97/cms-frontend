import { Card, CardContent, CardActions, Grid2 as Grid, TextField, Typography, Button } from '@mui/material'
import { useState, type FC } from 'react'
import { ComponentVariantEnum } from '../../utils/enums/ComponentVariantEnum'


export interface IForm {
  email: string
  password: string 
}
type CardAuthProps = {
  title: string
  subTitle?: string
  onSubmit: (val: IForm) => void
}

export const CardAuth: FC<CardAuthProps> = ({ title, subTitle, onSubmit }) => {

  const [formValue, setFormValue] = useState<IForm>({
    email: '',
    password: ''
  })
  const [formValidations, setFormValidations] = useState<{
    isEmailValid: boolean
    emailHelperText: string
    isPasswordValid: boolean
    passwordHelperText: string
  }>({
    isEmailValid: false,
    emailHelperText: 'hola, soy el texto de text',
    isPasswordValid: false,
    passwordHelperText: '',
  })

  const handleSubmit = (val: IForm) => {
    
    if (!val.email && !val.password) {
      return setFormValidations({
        isEmailValid: true,
        emailHelperText: 'El campo email es requerido',
        isPasswordValid: true,
        passwordHelperText: 'El campo password es requerido'
      })
    }

  }
  return (
    <Card sx={{ maxHeight: "25rem" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {subTitle}
        </Typography>
        <Grid container my={2}>
          <Grid size={12} mb={3}>
            <TextField
              label="Email"
              type="email"
              required
              variant={ComponentVariantEnum.STANDARD}
              fullWidth
              onChange={({ target: { value } }) =>
                setFormValue({ ...formValue, email: value })
              }
              error={formValidations.isEmailValid}
              helperText={
                formValidations.isEmailValid && formValidations.emailHelperText
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              variant={ComponentVariantEnum.STANDARD}
              onChange={({ target: { value } }) =>
                setFormValue({ ...formValue, password: value })
              }
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={ComponentVariantEnum.CONTAINED}
          onClick={() => handleSubmit(formValue)}
        >
          Enviar
        </Button>
      </CardActions>
    </Card>
  )
}
