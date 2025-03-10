import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'

export default function AuthForm() {
  return (
    <div className={'w-96 flex flex-col gap-8'}>
      <h2 className={'text-2xl font-bold'}>Вход</h2>
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <h3 className={'font-semibold'}>Имя пользователя</h3>
          <Input placeholder={'Имя пользователя'}/>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h3 className={'font-semibold'}>Пароль</h3>
          <Input placeholder={'Пароль'} type={'password'}/>
        </div>
        <Button text={'Войти'}/>
        <p className={'text-xs text-center'}>Еще нет аккаунта? Обратитесь к своему администратору</p>
      </div>
    </div>
  )
}