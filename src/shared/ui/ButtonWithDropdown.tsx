'use client'
import {useEffect, useRef, useState} from 'react'
import Button from '@/shared/ui/Button'
import Select from '@/shared/ui/Select'

interface ButtonWithDropdownProps {
  options: string[]
  text: string
  color?: 'primary' | 'secondary' | 'danger'
  onSelect: (selected: string) => void
}

export default function ButtonWithDropdown({text, options, color = 'primary', onSelect}: ButtonWithDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = (selected: string) => {
    setSelectedValues((prev) =>
      prev.includes(selected) ? prev.filter((v) => v !== selected) : [...prev, selected]
    )
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
    <div className={'relative max-w-[320px]'} ref={selectRef}>
      <Button text={text} color={color} onClick={() => setIsOpen(!isOpen)}/>
      {isOpen && (
        <Select
          options={options}
          onSelect={handleSelect}
          selectedValues={selectedValues}
        />
      )}
    </div>
  )
}