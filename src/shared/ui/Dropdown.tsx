'use client'
import {useEffect, useRef, useState} from 'react'
import SelectInput from '@/shared/ui/SelectInput'
import Select from '@/shared/ui/Select'

interface DropdownProps {
  options: string[]
  placeholder: string
  multiple?: boolean
  onSelect: (selected: string) => void
}

export default function Dropdown({options, placeholder, multiple = false, onSelect}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = (selected: string) => {
    if (multiple) {
      setSelectedValues((prev) =>
        prev.includes(selected) ? prev.filter((v) => v !== selected) : [...prev, selected]
      )
    } else {
      setSelectedValues([selected])
      setIsOpen(false)
    }
    onSelect(selected)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={'relative'} ref={selectRef}>
      <SelectInput placeholder={placeholder} value={selectedValues.join(', ')} onClick={() => setIsOpen(!isOpen)}/>
      {isOpen && <Select options={options} onSelect={handleSelect} selectedValues={selectedValues}/>}
    </div>
  )
}