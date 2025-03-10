import {create} from 'zustand'
import {post} from '@/shared/api'

type UserData = {
  name: string,
  lastname: string,
  login: string,
  email: string,
  photo: string,
  role: string,
  groups: string[] | string,
}

type UserCreationStore = {
  user: UserData,
  updateField: (field: keyof UserData, value: UserData[keyof UserData]) => void,
  sendData: () => Promise<boolean>,
}

export const useUserCreationStore = create<UserCreationStore>((set, get) => ({
  user: {
    name: '',
    lastname: '',
    login: '',
    email: '',
    photo: '',
    role: '',
    groups: []
  },
  updateField: (field: keyof UserData, value: UserData[keyof UserData]) => {
    set((state) => ({
      user: {
        ...state.user,
        [field]: value
      }
    }))
  },
  sendData: async (): Promise<boolean> => {
    try {
      const form = get()
      const data = {
        name: form.user.name,
        lastname: form.user.lastname,
        login: form.user.login,
        email: form.user.email,
        photo: form.user.photo,
        role: form.user.role,
        groups: form.user.groups
      }
      const response = await post<UserData, { status: number }>('', data)
      if (response && response.status === 200) {
        return true
      }
    } catch (error) {
      console.error(error)
    }
    return false
  }
}))