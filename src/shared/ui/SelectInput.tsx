import {InputHTMLAttributes} from 'react'
import {ChevronDown, ChevronsUpDown} from 'lucide-react'
import Input from '@/shared/ui/Input'
import cn from 'classnames'

interface SelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  multiple?: boolean
}

export default function SelectInput({multiple, ...props}: SelectInputProps) {
  const chevronStyles = 'absolute pointer-events-none right-2 top-1/2 transform -translate-y-1/2 text-gray-400'
  return (
    <div className={'relative'}>
      <Input {...props} readOnly className={cn({'cursor-pointer': !props.disabled})}/>
      {multiple
        ? <ChevronsUpDown className={chevronStyles} size={16}/>
        : <ChevronDown className={chevronStyles} size={16}/>
      }
    </div>
  )
}