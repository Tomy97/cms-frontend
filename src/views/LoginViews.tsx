import { Card } from 'primereact/card'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { type FC, useRef, useState } from 'react'
import { CustomButton } from '../components/buttons/CustomButton'
import { useLazyGetLoginServiceQuery } from '../redux/services/auth.service'
import { Toast, type ToastMessage } from 'primereact/toast'
import { RoutesEnum } from '../utils/enums/RoutesEnum'
import { useNavigate } from 'react-router-dom'

export const LoginViews = () => {
  const [value, setValue] = useState<{
    email: string
    password: string
  }>({
    email: "",
    password: "",
  })
  const [trigger] = useLazyGetLoginServiceQuery()
  const toast = useRef(null)
  const navigate = useNavigate()
  const showMessage = (
    ref: React.RefObject<Toast>,
    severity: ToastMessage["severity"],
  ) => {
    ref.current?.show({ severity: severity, life: 3000 })
  }
  const handleSubmit = async () => {
    await trigger({
      req: value,
      callbackSuccess: (isSuccess) => {
        if (isSuccess) {
          showMessage(toast, "success")
          navigate(RoutesEnum.HOME)
        } else {
          showMessage(toast, "error")
        }
      }
    })
  }
  const footer: FC = () => {
    return (
      <div className='flex'>
        <CustomButton
          label='Enviar'
          customClasses='w-full'
          onClick={handleSubmit}
        />
      </div>
    )
  }
  return (
    <main className="flex h-screen justify-content-center align-items-center">
      <Card
        title="Bienvenido"
        subTitle="ingrese sus credenciales para ingresar"
        footer={footer}
        className="w-25rem"
      >
        <FloatLabel className='mb-5'>
          <InputText
            id="email"
            value={value.email}
            className='w-full'
            onChange={e => setValue({ ...value, email: e.target.value })}
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <Password
            id="password"
            value={value.password}
            className='w-full'
            inputClassName='w-full'
            onChange={e => setValue({ ...value, password: e.target.value })}
          />
          <label htmlFor="password">Contraseña</label>
        </FloatLabel>
      </Card>
      <Toast ref={toast} position="top-center" />
    </main>
  )
}
