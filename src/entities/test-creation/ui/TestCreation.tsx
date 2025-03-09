'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Textarea from '@/shared/ui/Textarea'
import TestFormWithTheme from '@/entities/test-creation/ui/TestFormWithTheme'
import {useTestCreationStore} from '@/entities/test-creation/model/store'

export default function TestCreation() {
  const store = useTestCreationStore()

  const handleSubmit = () => {
    console.log(store)
  }

  return (
    <div className={'flex flex-col gap-4'}>
      <h1 className={'font-bold text-xl'}>Создание теста</h1>
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
      <div className={'flex gap-2'}>
        <Button text={'Опубликовать'} onClick={handleSubmit}/>
        <Button text={'Добавить в черновик'} color={'secondary'}/>
      </div>
    </div>
  )
}