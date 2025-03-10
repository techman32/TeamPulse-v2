'use client'
import {useState} from 'react'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Dropdown from '@/shared/ui/Dropdown'
import {useUserCreationStore} from '@/entities/user-creation/model/store'
import {LoaderCircle} from 'lucide-react'

export default function UserCreation() {
  const [isLoading, setIsLoading] = useState(false)
  const store = useUserCreationStore()

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await store.sendData()
    } catch (error) {
      console.log('Произошла ошибка, при отправке формы создания пользователя', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={'flex flex-col gap-4'}>
      <h1 className={'font-bold text-2xl'}>Создание пользователя</h1>
      <div className={'flex gap-4'}>
        <div className={'flex flex-col gap-2 w-full'}>
          <h2 className={'font-semibold'}>Имя</h2>
          <Input
            placeholder={'Введите имя'}
            disabled={isLoading}
            onChange={(e) => {
              store.updateField('name', e.target.value)
            }}
          />
        </div>
        <div className={'flex flex-col gap-2 w-full'}>
          <h2 className={'font-semibold'}>Фамилия</h2>
          <Input
            placeholder={'Введите фамилию'}
            disabled={isLoading}
            onChange={(e) => {
              store.updateField('lastname', e.target.value)
            }}
          />
        </div>
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Имя пользователя</h2>
        <Input
          placeholder={'Введите имя пользователя'}
          disabled={isLoading}
          onChange={(e) => {
            store.updateField('login', e.target.value)
          }}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Email</h2>
        <Input
          placeholder={'Введите email'}
          disabled={isLoading}
          onChange={(e) => {
            store.updateField('email', e.target.value)
          }}
        />
      </div>
      <div className={'flex flex-col items-start gap-2'}>
        <h2 className={'font-semibold'}>Фотография</h2>
        <Button text={'Загрузить фотографию'} disabled={isLoading} color={'secondary'}/>
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Роль</h2>
        <Dropdown
          options={['Сотрудник', 'Администратор', 'Руководитель']}
          placeholder={'Выберите роль'}
          selected={[store.user.role || '']}
          disabled={isLoading}
          onSelect={(e) => {
            store.updateField('role', e)
          }}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Группы</h2>
        <Dropdown
          options={['Backend', 'Frontend', 'IT', 'Sites', 'В декрете']}
          placeholder={'Выберите группы'}
          selected={[...(store.user.groups)]}
          multiple
          disabled={isLoading}
          onSelect={(e) => {
            store.updateField('groups', e)
          }}
        />
      </div>
      <div>
        <Button
          text={isLoading ? '' : 'Создать пользователя'}
          onClick={handleSubmit}
          disabled={isLoading}
          icon={isLoading ? <LoaderCircle className={'animate-spin'} size={20}/> : <></>}
        />
      </div>
    </div>
  )
}