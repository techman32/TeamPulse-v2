import {ButtonHTMLAttributes} from 'react'
import Link from 'next/link'
import Button from '@/shared/ui/Button'

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  href: string
  color?: 'primary' | 'secondary' | 'danger'
}

export default function LinkButton({text, color = 'primary', href, ...props}: LinkButtonProps) {

  return (
    <Link href={href}>
      <Button text={text} color={color} {...props}/>
    </Link>
  )
}