import { Fragment, type FC } from 'react'
import { useLazyGetLoginServiceQuery } from '../redux/services/auth.service'
import { RoutesEnum } from '../../utils/enums/RoutesEnum'
import { useNavigate } from 'react-router-dom'
import { Grid2 as Grid } from '@mui/material'
import { CardAuth, type IForm } from '../components/CardAuth'
import { Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

export const LoginViews: FC = () => {
  const [trigger, { isSuccess }] = useLazyGetLoginServiceQuery()
  const navigate = useNavigate()
 
  const handleSubmit = async (val: IForm) => {
    await trigger({
      req: val,
      callbackSuccess: (isSuccess) => {
        if (isSuccess) {
          navigate(RoutesEnum.HOME)
        }
      }
    })
  }
  return (
    <Fragment>
      <Grid
        component="main"
        container
        justifyContent="center"
        alignItems="center"
      >
        <CardAuth
          title='Bienvenido'
          subTitle='Ingrese sus credenciales para ingresar'
          onSubmit={(val) => handleSubmit(val)}
        />
      </Grid>
      {
        isSuccess ? (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            This success Alert has a custom icon.
          </Alert>
        ) :
        (
          <Alert severity="error" >This is a error Alert.</Alert>
        )
      }
    </Fragment>
  )
}
