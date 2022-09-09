import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export const filterSort = (
  e: React.ChangeEvent<HTMLSelectElement>,
  dispatch: (arg0: any) => void,
  setSort: ActionCreatorWithPayload<string | number, string>,
) => {
  dispatch(setSort(e.target.value))
}
