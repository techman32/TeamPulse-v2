import {create} from 'zustand'

type Theme = {
  id: string;
  name: string;
};

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
  themeId?: string,
  topic: string | 'default',
  answerType: number,
  answers: Answer[],
  tags: string[],
}

type TestCreationStore = {
  title: string,
  description: string,
  questions: Question[],
  themes: Theme[];

  setTitle: (title: string) => void,
  setDescription: (description: string) => void,
  addQuestion: () => void,
  updateQuestion: (id: string, data: Partial<Question>) => void,
  addTheme: (name: string) => void;
}

export const useTestCreationStore = create<TestCreationStore>((set) => ({
  title: '',
  description: '',
  questions: [],
  themes: [],

  setTitle: (title: string) => set({title}),
  setDescription: (description: string) => set({description}),
  addQuestion: () => set((state) => ({
    questions: [
      ...state.questions,
      {
        id: crypto.randomUUID(),
        title: '',
        topic: 'default',
        answerType: 0,
        answers: [],
        tags: []
      }
    ]
  })),
  updateQuestion: (id: string, data: Partial<Question>) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? {...q, ...data} : q)
    })),
  addTheme: (name) => {
    if (name.trim()) {
      set((state) => ({
        themes: [
          ...state.themes,
          {
            id: crypto.randomUUID(),
            name
          }
        ]
      }))
    }
  }
}))