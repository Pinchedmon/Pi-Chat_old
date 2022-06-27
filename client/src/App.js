import axios from "axios";
function App() {
  (axios.get('http://localhost:6060/feed')).then((res) => {console.log(res)})
  return (
    <div>
    </div>
  );
}
export default App;
