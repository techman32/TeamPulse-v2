import {ReactNode} from 'react'
import Logo from '@/widgets/logo/ui'
import Sidebar from '@/widgets/sidebar/ui'

export default function DashboardLayout({children}: { children: ReactNode }) {
  return (
    <div className="h-screen">
      <Logo/>
      <Sidebar/>
      <div className="pt-[61px] h-screen overflow-auto px-14">
        {children}
      </div>
    </div>
  )
}