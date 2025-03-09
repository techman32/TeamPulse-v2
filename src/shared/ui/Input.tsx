import {InputHTMLAttributes} from 'react'
import cn from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default function Input({className, ...props}: InputProps) {
  const defaultStyles = 'border border-gray-200 rounded-md w-full px-3 py-2 shadow-xs outline-none transition-all'
  const hoverStyles = 'hover:border-gray-300 focus-visible:border-black'

  return <input {...props} className={cn(defaultStyles, hoverStyles, className)}/>
}