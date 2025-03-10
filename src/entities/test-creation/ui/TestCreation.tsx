'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Textarea from '@/shared/ui/Textarea'
import TestFormWithTheme from '@/entities/test-creation/ui/TestFormWithTheme'
import {useTestCreationStore} from '@/entities/test-creation/model/store'
import {Import} from 'lucide-react'

export default function TestCreation() {
  const store = useTestCreationStore()

  const handleSubmit = async () => {
    await store.sendData()
  }

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex justify-between flex-wrap gap-4'}>
        <h1 className={'font-bold text-3xl'}>Создание теста</h1>
        <Button text={'Импортировать'} color={'secondary'} icon={<Import size={16}/>}/>
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Название</h2>
        <Input
          placeholder={'Введите название'}
          onChange={(e) => store.setTitle(e.target.value)}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Описание</h2>
        <Textarea
          placeholder={'Введите описание'}
          onChange={(e) => store.setDescription(e.target.value)}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Тест</h2>
        <TestFormWithTheme/>
      </div>
      <div className={'flex gap-2 flex-wrap'}>
        <Button text={'Опубликовать'} onClick={handleSubmit}/>
        <Button text={'Добавить в черновик'} color={'secondary'}/>
      </div>
    </div>
  )
}