import { useEffect, useState } from "react";
import axios from 'axios';
import './App.css'
import starLogo from '../assets/star.svg'
import lensLogo from '../assets/lens.svg'
import api from '../api/api';

const BASE_URL = 'http://127.0.0.1:8000';

export function App() {
  const [key, setKey] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchTodo(key) {
    try {
      setIsLoading(true);
      let response;
      if (key === '') {
        response = await api.get(`${BASE_URL}/show/restaurant`);
      } else {
        response = await api.get(`${BASE_URL}/search/${key}`);
      }
      if (response.status === 200){
      setTodos(response.data);
      }
      

    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() =>{
    fetchTodo(key)
  },[])


  const handleChange = (event) => {
    setKey(event.target.value);
  };

  const handleSubmit = () => {
    fetchTodo(key);
  };

  return (
    <>
      <section className="grid place-items-center bg-emerald-900 p-16 min-h-screen">
        <div>
          <div className="flex gap-2 relative  shadow-md sm:rounded-lg">
            <div class="relative mt-0">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img src={lensLogo} className="logo" alt="Star logo" />
            </div>
            <input
              className="mt-1   px-3 py-2  border border-slate-1000  shadow-sm bg-gray-50 focus:outline-none focus:border-green-200 text-gray-900 text-sm rounded-lg  block w-80 pl-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
              type="text"
              placeholder="สั่งอะไรดี?"
              value={key}
              onChange={handleChange}
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                  handleSubmit();
              }
               }}
            />
            </div>
            <button
              className="h-12 min-w-[8rem] rounded-lg border-2 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <br />

          {isLoading ? (
            <div>Loading..</div>
          ) : (
            todos.map((todo, index) => (
              <div key={index} className="border border-gray-200 p-4 mb-4 rounded-md bg-white flex flex-col justify-center items-center">
            <div className="font-semibold">{todo._Restaurant__name_restaurant}</div>
            <div className="flex items-center ">
            <img src={starLogo} className="logo" alt="Star logo" />
            <div className="font-semibold">{todo._Restaurant__rate}</div>
            </div>
            </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default App;

