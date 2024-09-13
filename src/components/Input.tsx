import { ChangeEvent } from "react"


interface InputProps {
  type: string,
  id: string,
  name: string,
  required?: boolean,
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({type, id, name, required, defaultValue, onChange}) => {
  return (
    <input type={type} id={id} name={name} required={required} defaultValue={defaultValue} onChange={onChange}/>
  )
}

export default Input