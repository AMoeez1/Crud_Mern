// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', age: '' });

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/users', form);
    setForm({ name: '', email: '', age: '' });
    fetchUsers();
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User CRUD</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
      <button onClick={handleSubmit}>Add User</button>

      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} ({u.email}, {u.age}) 
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
