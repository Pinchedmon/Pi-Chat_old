import { IhandleClick } from '../../../../../../../types/handleClick.interface'

export const handleClick = (props: IhandleClick) => {
  const { selectedMsg, addSelected, removeSelected, dispatch, setSelectedMsg, ID } = props
  if (selectedMsg === '') {
    setSelectedMsg('bg-gray-100')
    dispatch(addSelected(ID))
  } else {
    setSelectedMsg('')
    dispatch(removeSelected(ID))
  }
}
