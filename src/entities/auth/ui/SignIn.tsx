import AuthForm from '@/entities/auth/ui/AuthForm'

export default function SignIn() {
  return (
    <div className={'h-screen w-full grid grid-cols-[50%_50%]'}>
      <div className={'w-full flex justify-center items-center'}>
        <AuthForm/>
      </div>
      <div className={'w-full flex justify-center items-center p-6'}>
        <div className={'w-full h-full bg-black rounded-4xl flex justify-center items-center'}>
          <h2 className={'text-white text-8xl font-bold relative'}>
            <span className={'text-black relative z-10'}>Team</span>
            <span className={'relative z-10'}>Pulse</span>
            <div className={'absolute inset-0 flex justify-center items-center'}>
              <div className={'w-60 h-60 bg-white rounded-full absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2'}></div>
            </div>
          </h2>
        </div>
      </div>
    </div>
  )
}