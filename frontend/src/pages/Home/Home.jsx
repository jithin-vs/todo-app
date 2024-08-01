import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from '../../components/Button/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import TextField from '../../components/TextField/TextField.jsx';
import './home.css'

const Home = () => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

   useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getTodo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTodo();
   },[]);
  
   const handleAddTask = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteTodo/${id}`, 
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter(item => item.id !== response.data.id));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title) {
      alert('Title is mandatory');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/addTodo',
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prevData) => [...prevData, response.data]);
      setNewTask({ title: '', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  return (
    <div className='main-body'>
     <div className='task-button'>
         <Button btnType='new-task-btn' onClick={handleAddTask}>+</Button>
      </div>
      <div className="card-container">
      {data.length === 0 ? (
        <p>No Tasks</p>
        ) : (
          data.map((item) =>
            <Card
              key={item.id}
              id={item.id}
              description={item.description}
              title={item.title}
              onDelete={handleDelete}
            />
          )
      )}
      </div>   
      {showForm && (
        <div className='task-form'>
          <form onSubmit={handleFormSubmit}>
            <div>
              <TextField
              inputType='text'
              name='title'
              value={newTask.title}
              onChange={handleFormChange}
              placeholder='Enter title'
              required
            >
              Title
            </TextField>
            </div>
            <div>
            <TextField
              inputType='text'
              name='description'
              value={newTask.description}
              onChange={handleFormChange}
              placeholder='Enter description'
            >
              Description
            </TextField>
            </div>
            <Button btnType='submit' type='submit'>
              Add Task
            </Button>
          </form>
        </div>
      )}
    </div>
    
  )
}

export default Home