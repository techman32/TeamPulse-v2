import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Dropdown from '@/shared/ui/Dropdown'
import ButtonWithDropdown from '@/shared/ui/ButtonWithDropdown'
import {useTestCreationStore} from '@/entities/test-creation/model/store'

export default function TestForm() {
  const store = useTestCreationStore()
  const answerTypes = ['Развернутый ответ', 'Одиночный выбор', 'Множественный выбор', 'Оценка (1-10)']

  return (
    <div className={'border border-gray-200 rounded-md p-4 flex flex-col gap-2'}>
      {store.questions.length > 0 && (
        <div className={'flex flex-col gap-2'}>
          <h3 className={'font-semibold'}>Вопросы</h3>
          {store.questions.map((question, index) => (
            <div key={index} className={'border border-gray-200 rounded-md p-4 flex flex-col gap-2'}>
              <p className={'font-semibold'}>Вопрос {++index}</p>
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
                  store.updateQuestion(question.id, {title: e.target.value})
                }}
              />
              <Dropdown
                options={answerTypes}
                placeholder={'Выберите тип ответа'}
                onSelect={(selected) => {
                  const type = answerTypes.indexOf(selected)
                  store.updateQuestion(question.id, {
                    answerType: type
                  })
                }}
              />
              <div>
                <ButtonWithDropdown
                  options={['Стрессоустойчивость', 'Лидерство', 'Технический']}
                  text={'Добавить тег'}
                  onSelect={(selected) => {
                    store.updateQuestion(question.id, {
                      tags: question.tags.includes(selected)
                        ? question.tags.filter(tag => tag !== selected)
                        : [...question.tags, selected]
                    })
                  }}
                  color={'secondary'}
                />
              </div>
              {(question.answerType === 1 || question.answerType === 2) && (
                <div className={'border border-gray-200 rounded-md p-4 flex flex-col gap-2'}>
                  {question.answers.map((answer, index) => (
                    <div key={index} className={'flex flex-col gap-2'}>
                      <p className={'font-semibold'}>Ответ {++index}</p>
                      <Input
                        placeholder={'Введите ответ'}
                        value={answer.text}
                        onChange={(e) => {
                          store.updateQuestion(question.id, {
                            answers: question.answers.map((a) =>
                              a.id === answer.id ? {...a, text: e.target.value} : a
                            )
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
                              store.updateQuestion(question.id, {
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
                        store.updateQuestion(question.id, {
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
        </div>
      )}
      <div>
        <Button
          text={'Добавить вопрос'}
          color={'secondary'}
          onClick={() => {
            store.addQuestion()
          }}
        />
      </div>
    </div>
  )
}