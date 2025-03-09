import {InputHTMLAttributes} from 'react'
import cn from 'classnames'

export default function Textarea({...props}: InputHTMLAttributes<HTMLTextAreaElement>) {
  const defaultStyles = 'border border-gray-200 min-h-[120px] rounded-md w-full px-3 py-2 shadow-xs transition-colors outline-none'
  const hoverStyles = 'hover:border-gray-300 focus-visible:border-black'

  return <textarea {...props} className={cn(defaultStyles, hoverStyles)}/>
}