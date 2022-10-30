import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input  = ({...props}: InputProps) => {
  return ( 
    <input className='
            h-8 
            w-72 
            border-2 
            rounded-md
            border-black' 
            {...props}
            />
  )
}