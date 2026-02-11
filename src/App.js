import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch todos
  const fetchTodos = () => {
    axios.get('http://localhost:3000/')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = () => {
    axios.post('http://localhost:3000/', {
      title,
      description
    })
    .then(() => {
      setTitle('');
      setDescription('');
      fetchTodos();
    })
    .catch(err => console.log(err));
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3000/${id}`)
      .then(() => fetchTodos())
      .catch(err => console.log(err));
  };

  // Toggle completed
  const toggleComplete = (todo) => {
    axios.put(`http://localhost:3000/${todo.id}`, {
      completed: !todo.completed
    })
    .then(() => fetchTodos())
    .catch(err => console.log(err));
  };

  return (
    <div style={{ 
      textAlign: 'center',
      backgroundColor: '#111',
      color: 'white',
      minHeight: '100vh',
      padding: '20px'
}}>

      <h1 style={{ fontSize: '40px', color: 'blue' }}>Todo List</h1>
      <input
      style={{
      padding: '10px',
      margin: '5px',
      borderRadius: '8px',
      border: '1px solid gray'
    }}
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />
    <input
    style={{
    padding: '10px',
    margin: '5px',
    borderRadius: '8px',
    border: '1px solid gray'
  }}
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  />
  <button
  onClick={addTodo}
  style={{
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
    }}>Add Todo</button>
    
    <hr/>

      {todos.map(todo => (
        <div
        key={todo.id}
        style={{
          background: '#222',
          padding: '15px',
          margin: '10px auto',
          width: '300px',
          borderRadius: '10px'
          }}>

          <h3
            onClick={() => toggleComplete(todo)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.title}
          </h3>
          <p>{todo.description}</p>
          <button onClick={() => toggleComplete(todo)}>Complete</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
