import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export const filterCategory = (
  e: React.ChangeEvent<HTMLSelectElement>,
  dispatch: (arg0: any) => void,
  setCategory: ActionCreatorWithPayload<string, string>,
) => {
  dispatch(setCategory(e.target.value))
}
