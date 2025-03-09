import {ButtonHTMLAttributes} from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  color: 'primary' | 'secondary' | 'danger'
}

export default function Button({text, color = 'primary', ...props}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn('rounded-md min-w-[180px] px-4 py-2 transition-all cursor-pointer', {
        'bg-black text-white hover:bg-black/85 active:bg-black/80': color === 'primary',
        'bg-white border border-gray-200 text-black hover:bg-gray-50 active:bg-gray-100': color === 'secondary',
        'bg-red-500 text-white hover:bg-red-500/85 active:bg-red-500/80': color === 'danger'
      })}
    >
      {text}
    </button>
  )
}