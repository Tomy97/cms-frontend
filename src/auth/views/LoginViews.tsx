import { type FC } from 'react'
import { useLazyGetLoginServiceQuery } from '../redux/services/auth.service'
import { RoutesEnum } from '../../utils/enums/RoutesEnum'
import { useNavigate } from 'react-router-dom'
import { Grid2 as Grid } from '@mui/material'
import { CardAuth, type IForm } from '../components/CardAuth'

export const LoginViews: FC = () => {
  const [trigger] = useLazyGetLoginServiceQuery()
  const navigate = useNavigate()
 
  const handleSubmit = async (val: IForm) => {
    try {
      await trigger({
        req: val
      }).unwrap()
      navigate(RoutesEnum.HOME)
    } catch (error) {
      console.log('no se pudo loguear')
    }
  }
  return (
    <Grid
      component="main"
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <CardAuth
        title="Bienvenido"
        subTitle="Ingrese sus credenciales para ingresar"
        onSubmit={val => handleSubmit(val)}
      />
    </Grid>
  )
}
