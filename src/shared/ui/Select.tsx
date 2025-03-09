import cn from 'classnames'

interface SelectProps {
  options: string[]
  selectedValues: string[]
  onSelect: (value: string) => void
}

export default function Select({options, selectedValues, onSelect}: SelectProps) {
  const containerStyles = 'absolute top-full left-0 w-full mt-1 border border-gray-200 rounded-md bg-white shadow-xs z-10 origin-top'
  const elementStyles = 'px-3 py-2 cursor-pointer hover:bg-gray-100'

  return (
    <ul className={cn(containerStyles)}>
      {options.map((option) => (
        <li key={option} className={cn(elementStyles)} onClick={() => onSelect(option)}>
          <span className={cn({'text-black/40': selectedValues.includes(option)})}>{option}</span>
        </li>
      ))}
    </ul>
  )
}