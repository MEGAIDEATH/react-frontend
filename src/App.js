import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      {data.map((item, index) => (
        <p key={index}>{item.name || JSON.stringify(item)}</p>
      ))}
    </div>
  );
}

export default App;
