import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Profile from "./pages/Profile.jsx";
import Garage from "./pages/Garage.jsx";

import { getCars, deleteCar, addCar } from "./services/user.service.js";

function App() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem("user");
    if (userName) {
      setUser(userName);
    }

    const fetchCars = async () => {
      const data = await getCars();
      setCars(data);
    };
    fetchCars();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const removeVehicle = async (index) => {
    await deleteCar(index);
    const data = await getCars();
    setCars(data);
  };

  const addVehicle = async (car) => {
    await addCar(car);
    const data = await getCars();
    setCars(data);
  };

  return (
    <div className="w-full overflow-hidden">
      <Header user={user} logout={handleLogOut} />
      <Routes>
        <Route path="/" element={<Home user={user} cars={cars} />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/garage"
          element={
            <Garage cars={cars} onAdd={addVehicle} onRemove={removeVehicle} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
