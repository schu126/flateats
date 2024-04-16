import { useState, useEffect } from 'react';
import './App.css';
import Header from '../Header/Header';
import RestaurantMap from '../RestaurantMap';
import RestaurantList from '../RestaurantList';
import Login from '../Login';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [search, setSearch] = useState('');

  const filteredPost = restaurants.filter((p) => {
    return p.name.toLowerCase().includes(search.toLowerCase());
  });
  console.log(filteredPost);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/restaurants');
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    fetch('/api/check_session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => {
      setLoggedIn(res.ok);
    });
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div id="main">
        <RestaurantList
          restaurants={filteredPost}
          search={search}
          setSearch={setSearch}
        />
        <RestaurantMap />
      </div>
    </>
  );
}

export default App;
