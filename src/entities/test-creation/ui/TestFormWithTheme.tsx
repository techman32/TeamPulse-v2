import Button from '@/shared/ui/Button'
import {useTestCreationStore} from '@/entities/test-creation/model/store'
import Input from '@/shared/ui/Input'
import TestForm from '@/entities/test-creation/ui/TestForm'

export default function TestFormWithTheme() {
  const store = useTestCreationStore()

  return (
    <div className={'flex flex-col gap-4'}>
      {store.tests.length > 0 && store.tests.map((test, index) => (
        <div key={index} className={'border border-gray-200 rounded-md flex flex-col gap-2 p-4'}>
          <h2 className={'font-semibold'}>Тема</h2>
          <Input
            placeholder={'Введите название темы'}
            onChange={(e) => store.setTestTopic(test.id, e.target.value)}
          />
          <TestForm testId={test.id}/>
        </div>
      ))}
      <div>
        <Button text={'Добавить тему'} color={'secondary'} onClick={() => store.addTest()}/>
      </div>
    </div>
  )
}