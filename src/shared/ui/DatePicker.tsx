'use client'
import {useEffect, useRef, useState} from 'react'
import DateInput from '@/shared/ui/DateInput'
import Calendar from '@/shared/ui/Calendar'

export default function DatePicker() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [date, setDate] = useState<Date | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDate = (year: number, month: number, day: number) => {
    setDate(new Date(year, month, day))
  }

  return (
    <div className={'relative'} ref={selectRef}>
      <DateInput
        placeholder={'Выберите дату'}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        value={date ? date.toLocaleDateString('ru-RU') : ''}
      />
      {isOpen && <Calendar className={'absolute z-10 mt-1'} onChange={handleDate}/>}
    </div>
  )
}