import moment from 'moment'
import 'moment/locale/ru'
interface ISODateFormatted {
  _ISODateString: never
}

export type ISODateString = string & ISODateFormatted
export type DateLike = Date | number | ISODateString | moment.Moment | string

moment.locale('ru')
export const format = (d: DateLike) => moment(d).format('DD MMMM YYYY HH:mm:ss')
export const formatDate = (d: DateLike) => moment(d).format('DD MMMM YYYY')
export const formatTime = (d: DateLike) => moment(d).format('HH:mm:ss')
export const formatLeft = (d: DateLike) => moment(d).fromNow()
