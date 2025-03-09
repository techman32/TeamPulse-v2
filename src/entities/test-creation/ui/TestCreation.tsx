'use client'
import {useState} from 'react'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Textarea from '@/shared/ui/Textarea'
import RadioGroup from '@/shared/ui/RadioGroup'
import TestForm from '@/entities/test-creation/ui/TestForm'
import {useTestCreationStore} from '@/entities/test-creation/model/store'

export default function TestCreation() {
  const [testType, setTestType] = useState<string>('')
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
        <h2 className={'font-semibold'}>Тип теста</h2>
        <RadioGroup
          name={'testType'}
          labels={['Без тем', 'С темами']}
          onChange={setTestType}
          selected={testType}
        />
      </div>
      {testType.length > 0 && (
        <div className={'flex flex-col gap-2'}>
          <h2 className={'font-semibold'}>Тест</h2>
          {testType === 'Без тем' && <TestForm/>}
          {testType === 'С темами' && <div>С темами</div>}
        </div>
      )}
      <div className={'flex gap-2'}>
        <Button text={'Опубликовать'} onClick={handleSubmit}/>
        <Button text={'Добавить в черновик'} color={'secondary'}/>
      </div>
    </div>
  )
}