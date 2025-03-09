import {create} from 'zustand'

type TestAssignmentStore = {
  title: string
  description: string
  testId: string | null
  frequency: string | null
  startDate: Date | null
  endDate: Date | null
  groups: string[] | string
  employees: string[] | string

  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setTestId: (testId: string) => void
  setFrequency: (frequency: string) => void
  setStartDate: (date: Date | null) => void
  setEndDate: (date: Date | null) => void
  setGroups: (groups: string[] | string) => void
  setEmployees: (employees: string[] | string) => void
}

export const useTestAssignmentStore = create<TestAssignmentStore>((set) => ({
  title: '',
  description: '',
  testId: null,
  frequency: null,
  startDate: null,
  endDate: null,
  groups: [],
  employees: [],

  setTitle: (title) => set({title}),
  setDescription: (description) => set({description}),
  setTestId: (testId) => set({testId}),
  setFrequency: (frequency) => set({frequency}),
  setStartDate: (date) => set({startDate: date}),
  setEndDate: (date) => set({endDate: date}),
  setGroups: (groups) => set({groups}),
  setEmployees: (employees) => set({employees})
}))