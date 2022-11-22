import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export const filterCategory = async (
  e: React.ChangeEvent<HTMLSelectElement>,
  dispatch: (arg0: any) => void,
  setCategory: ActionCreatorWithPayload<string, string>,
) => {
  await dispatch(setCategory(e.target.value))
}
