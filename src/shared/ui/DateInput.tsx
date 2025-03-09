import {InputHTMLAttributes} from 'react'
import {CalendarDays} from 'lucide-react'
import Input from '@/shared/ui/Input'

export default function DateInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const chevronStyles = 'absolute pointer-events-none left-2 top-1/2 transform -translate-y-1/2 text-gray-400'
  return (
    <div className={'relative'}>
      <CalendarDays className={chevronStyles} size={16}/>
      <Input {...props} readOnly className={'cursor-pointer pl-8'}/>
    </div>
  )
}