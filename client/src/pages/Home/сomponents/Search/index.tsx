import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Input from '../../../../utils/input'
import Switch from '../../../../utils/switch'
import { throttle } from 'lodash'
const Search = (props: any) => {
  const [value, setValue] = useState('')
  const [filterCategory, setFilterCategory] = useState('Общее')
  const [filterCourse, setFilterCourse] = useState('1')
  const [items, setItems] = useState([])
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const [filter, setFilter] = useState(true)
  const throttled = useRef(
    throttle(
      (newValue, filterCategory, filterCourse, filter) =>
        axios
          .get(
            `http://localhost:6060/search/${
              filter ? `post?category=${filterCategory}&course=${filterCourse}&` : `user?`
            }query=${newValue}`,
          )
          .then((res) => {
            if (res.status === 200) {
              setItems(res.data.data)
            }
          }),
      500,
    ),
  )

  useEffect(() => {
    throttled.current(value, filterCategory, filterCourse, filter)
  }, [filterCategory, filterCourse, value, filter])

  return (
    <div className='mt-40px'>
      <form className=''></form>
      <Input value={value} handleChange={handleChangeText} placeholder={'Поиск'} />
      <Switch isOn={filter} handleToggle={() => setFilter(!filter)} />
      Пост
      <select
        defaultValue={filterCourse}
        onChange={(e) => setFilterCourse(e.target.value)}
        className='filterModal__filter'
      >
        <option value='value1' disabled>
          Сортировать по
        </option>
        <option value='1'>1 Курс</option>
        <option value='2'>2 Курс</option>
        <option value='3'>3 Курс</option>
        <option value='4'>4 Курс</option>
        <option value='Late'>Последнее</option>
      </select>
      <select
        defaultValue={filterCategory}
        onChange={(e) => {
          setFilterCategory(e.target.value)
        }}
        className='filterModal__filter'
      >
        <option value='value1' disabled>
          Категория
        </option>
        <option value='Общее'>Общее</option>
        <option value='Предметы'>Предметы</option>
        <option value='Вопросы'>Вопросы</option>
      </select>
      {items.map((item: { name: string; text?: string; ID: number }) => (
        <div key={item.ID}>
          {item.name} {item.text}
        </div>
      ))}
    </div>
  )
}

export default Search
