import { Button } from 'primereact/button'
import { type FC } from 'react'

interface CustomButtonProps {
  label: string
  customClasses?: string
  onClick: () => void
}
export const CustomButton: FC<CustomButtonProps> = ({ label, customClasses, onClick }) => {
  return <Button label={label} style={{ background: 'var(--background-primary)', boxShadow: 'none', borderColor: 'var(--border-primary)' }} className={customClasses} onClick={onClick}/>
}
