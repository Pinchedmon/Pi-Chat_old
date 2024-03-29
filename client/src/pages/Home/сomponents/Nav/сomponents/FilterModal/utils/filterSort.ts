import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export const filterSort = async (
  e: React.ChangeEvent<HTMLSelectElement>,
  dispatch: (arg0: any) => void,
  setSort: ActionCreatorWithPayload<string | number, string>,
) => {
  await dispatch(setSort(e.target.value))
}
