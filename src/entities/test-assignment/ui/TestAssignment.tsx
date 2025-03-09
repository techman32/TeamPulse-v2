'use client'
import Input from '@/shared/ui/Input'
import Textarea from '@/shared/ui/Textarea'
import Dropdown from '@/shared/ui/Dropdown'
import Button from '@/shared/ui/Button'
import {useTestAssignmentStore} from '@/entities/test-assignment/model/store'
import DatePicker from '@/shared/ui/DatePicker'

export default function TestAssignment() {
  const store = useTestAssignmentStore()
  return (
    <div className={'flex flex-col gap-4'}>
      <h1 className={'text-3xl font-bold'}>Назначение теста</h1>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Название</h2>
        <Input
          placeholder={'Введите название'}
          onChange={(e) => {
            store.setTitle(e.target.value)
          }}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Описание</h2>
        <Textarea
          placeholder={'Введите описание'}
          onChange={(e) => {
            store.setDescription(e.target.value)
          }}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Тест</h2>
        <Dropdown
          options={['Готовый тест 1', 'Готовый тест 2', 'Готовый тест 3']}
          placeholder={'Выберите тест'}
          selected={[store.testId || '']}
          onSelect={(selected) => {
            if (typeof selected === 'string') {
              store.setTestId(selected)
            }
          }}
        />
        {store.testId && (
          <div className={'flex gap-2'}>
            <Button text={'Посмотреть вопросы'} color={'secondary'}/>
            <Button text={'Редактировать'} color={'secondary'}/>
          </div>
        )}
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Периодичность</h2>
        <Dropdown
          options={['Каждый день', 'Каждую неделю', 'Каждый месяц', 'Каждые полгода', 'Каждый год']}
          placeholder={'Выберите периодичность'}
          selected={[store.frequency || '']}
          onSelect={(selected) => {
            if (typeof selected === 'string') {
              store.setFrequency(selected)
            }
          }}
        />
      </div>
      <div className={'flex gap-4 justify-stretch'}>
        <div className={'flex flex-col gap-2 w-full'}>
          <h2 className={'font-semibold'}>Дата начала</h2>
          <DatePicker onChange={store.setStartDate}/>
        </div>
        <div className={'flex flex-col gap-2 w-full'}>
          <h2 className={'font-semibold'}>Дата окончания</h2>
          <DatePicker onChange={store.setEndDate}/>
        </div>
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Группы</h2>
        <Dropdown
          options={['Frontend', 'Backend', 'IT', 'Sites', 'В декрете', 'Военнообязанные']}
          placeholder={'Выберите группы'}
          multiple
          selected={Array.isArray(store.groups) ? store.groups : [store.groups]}
          onSelect={(selected) => store.setGroups(selected)}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold'}>Сотрудники</h2>
        <Dropdown
          options={['Иван Иванов', 'Иван Петров', 'Петр Иванов', 'Петр Петров', 'Алексей Семенов', 'Семен Алексеев']}
          placeholder={'Выберите сотрудников'}
          multiple
          selected={Array.isArray(store.employees) ? store.employees : [store.employees]}
          onSelect={(selected) => store.setEmployees(selected)}
        />
      </div>
      <div className={'flex gap-2 flex-wrap'}>
        <Button text={'Назначить'} onClick={() => {
          console.log(store)
        }}/>
        <Button text={'Добавить в черновик'} color={'secondary'}/>
      </div>
    </div>
  )
}