import {create} from 'zustand'

type Tag = {
  name: string,
  points: number
}

type Answer = {
  id: string,
  text: string,
  tagPoints: Tag[],
}

type Question = {
  id: string,
  title: string,
  answerType: number,
  answers: Answer[],
  tags: string[],
}

type Test = {
  id: string,
  topic?: string,
  questions: Question[]
}

type TestCreationStore = {
  title: string,
  description: string,
  tests: Test[],
  setTitle: (title: string) => void,
  setDescription: (description: string) => void,
  addTest: () => void,
  setTestTopic: (id: string, topic: string) => void,
  addQuestion: (testId: string) => void,
  updateQuestion: (testId: string, questionId: string, data: Partial<Question>) => void,
}

export const useTestCreationStore = create<TestCreationStore>((set) => ({
  title: '',
  description: '',
  tests: [],
  setTitle: (title: string) => set({title}),
  setDescription: (description: string) => set({description}),
  addTest: () => set((state) => ({
    tests: [...state.tests, {
      id: crypto.randomUUID(),
      topic: 'default',
      questions: []
    }]
  })),
  setTestTopic: (id: string, topic: string) => set((state) => ({
    tests: state.tests.map(test => test.id === id ? {...test, topic} : test)
  })),
  addQuestion: (testId: string) => set((state) => ({
    tests: state.tests.map(test =>
      test.id === testId
        ? {
          ...test,
          questions: [
            ...test.questions,
            {
              id: crypto.randomUUID(),
              title: '',
              answerType: 0,
              answers: [],
              tags: []
            }
          ]
        }
        : test
    )
  })),
  updateQuestion: (testId: string, questionId: string, data: Partial<Question>) => set((state) => ({
    tests: state.tests.map(test =>
      test.id === testId
        ? {
          ...test,
          questions: test.questions.map(question =>
            question.id === questionId
              ? {...question, ...data}
              : question
          )
        }
        : test
    )
  }))
}))