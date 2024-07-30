import React, { useEffect, useState } from 'react'

const Home = () => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState();
   useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/getTodo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        console.log("hi",data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTodo();
  }, []);
  return (
    <div>Home</div>
  )
}

export default Home