import './Options.css'
import axios from 'axios'
const handleAdd = () => {
    axios.post('http://localhost:6060/feed', {author: 'John', text: 'hello'})
}
const Options = () => {
    
    return (<div className="options">
        <select name="select">
            <option value="value1" selected>Сортировать по</option>
            <option value="value2">Значение 1</option>
            <option value="value3" >Значение 2</option>
            <option value="value4">Значение 3</option>
        </select>
        <select name="select">
            <option value="value1" selected>Категория</option>
            <option value="value2">Значение 1</option>
            <option value="value3" >Значение 2</option>
            <option value="value4">Значение 3</option>
        </select>
        <button onClick={handleAdd}>Добавить пост</button>
    </div>)
}
export default Options