'use client'
import {useEffect, useRef, useState} from 'react'
import SelectInput from '@/shared/ui/SelectInput'
import Select from '@/shared/ui/Select'

interface DropdownProps {
  options: string[]
  placeholder: string
  multiple?: boolean
  selected?: string[]
  disabled?: boolean,
  onSelect: (selected: string | string[]) => void
}

export default function Dropdown({options, placeholder, multiple = false, selected = [], disabled, onSelect}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = (selectedItem: string) => {
    let newSelectedValues: string[] | string

    if (multiple) {
      newSelectedValues = selected.includes(selectedItem)
        ? selected.filter((v) => v !== selectedItem)
        : [...selected, selectedItem]
    } else {
      newSelectedValues = selectedItem
      setIsOpen(false)
    }

    onSelect(newSelectedValues)
  }

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
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
      <SelectInput
        placeholder={placeholder}
        value={Array.isArray(selected) ? selected.join(', ') : selected}
        disabled={disabled}
        onClick={handleOpen}
      />
      {isOpen && (
        <Select
          options={options}
          onSelect={handleSelect}
          selectedValues={Array.isArray(selected) ? selected : [selected]}
        />
      )}
    </div>
  )
}