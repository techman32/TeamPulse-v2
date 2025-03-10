'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Dropdown from '@/shared/ui/Dropdown'
import ButtonWithDropdown from '@/shared/ui/ButtonWithDropdown'
import {useTestCreationStore} from '@/entities/test-creation/model/store'

export default function TestForm({testId}: { testId: string }) {
  const store = useTestCreationStore()
  const currentTest = store.tests.find((test) => test.id === testId)
  const answerTypes = ['Развернутый ответ', 'Одиночный выбор', 'Множественный выбор', 'Оценка (1-10)']

  return (
    <div className={'border border-gray-200 rounded-md p-4 flex flex-col gap-2'}>
      {currentTest && currentTest.questions.length > 0 && currentTest.questions.map((question, index) => (
        <div key={index} className={'border border-gray-200 rounded-md p-4 flex flex-col gap-2'}>
          <h3 className={'font-semibold'}>Вопрос {++index}</h3>
          {question.tags.length > 0 && (
            <div className={'flex flex-wrap gap-1'}>
              {question.tags.map((tag, index) => (
                <p key={index} className={'text-xs px-2 py-0.5 bg-gray-300 rounded-full'}>{tag}</p>
              ))}
            </div>
          )}
          <Input
            placeholder={'Введите вопрос'}
            onChange={(e) => {
              store.updateQuestion(testId, question.id, {title: e.target.value})
            }}
          />
          <Dropdown
            options={answerTypes}
            placeholder={'Выберите тип ответа'}
            selected={[answerTypes[question.answerType]]}
            onSelect={(selected) => {
              const type = Array.isArray(selected) ? answerTypes.indexOf(selected[0]) : answerTypes.indexOf(selected)
              store.updateQuestion(testId, question.id, {answerType: type})
            }}
          />
          <div>
            <ButtonWithDropdown
              options={['Стрессоустойчивость', 'Лидерство', 'Технический']}
              text={'Добавить тег'}
              color={'secondary'}
              onSelect={(selected) => {
                store.updateQuestion(testId, question.id, {
                  tags: question.tags.includes(selected)
                    ? question.tags.filter(tag => tag !== selected)
                    : [...question.tags, selected]
                })
              }}
            />
          </div>
          {(question.answerType === 1 || question.answerType === 2) && (
            <div className={'border border-gray-200 rounded-md p-4 flex flex-col gap-2'}>
              {question.answers.map((answer, index) => (
                <div key={index} className={'flex flex-col gap-2'}>
                  <h4 className={'font-semibold'}>Ответ {++index}</h4>
                  <Input
                    placeholder={'Введите ответ'}
                    value={answer.text}
                    onChange={(e) => {
                      store.updateQuestion(testId, question.id, {
                        answers: question.answers.map((a) => (
                          a.id === answer.id ? {...a, text: e.target.value} : a
                        ))
                      })
                    }}
                  />
                  {question.tags.length > 0 && question.tags.map((tag, index) => (
                    <div key={index} className={'grid grid-cols-[auto_140px] gap-2'}>
                      <Input value={tag} readOnly/>
                      <Input
                        placeholder={'Баллы'}
                        type={'number'}
                        onChange={(e) => {
                          const points = Number(e.target.value)
                          store.updateQuestion(testId, question.id, {
                            answers: question.answers.map((a) =>
                              a.id === answer.id
                                ? {
                                  ...a,
                                  tagPoints: a.tagPoints.some(tp => tp.name === tag)
                                    ? a.tagPoints.map(tp => tp.name === tag ? {...tp, points} : tp)
                                    : [...a.tagPoints, {name: tag, points}]
                                }
                                : a
                            )
                          })
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
              <div>
                <Button
                  text={'Добавить ответ'}
                  color={'secondary'}
                  onClick={() => {
                    store.updateQuestion(testId, question.id, {
                      answers: [...(question.answers), {
                        id: crypto.randomUUID(),
                        text: '',
                        tagPoints: []
                      }]
                    })
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <div>
        <Button text={'Добавить вопрос'} color={'secondary'} onClick={() => store.addQuestion(testId)}/>
      </div>
    </div>
  )
}