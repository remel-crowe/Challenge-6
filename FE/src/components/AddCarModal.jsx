import { useState } from "react";
import { MdCancel } from "react-icons/md";

const AddCarModal = ({ onAdd, onClose }) => {
  const [car, setCar] = useState({
    make: "",
    model: "",
    maxMiles: "",
    charge: "",
    fastCharge: "",
  });

  const handleChange = (e) => {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(car);
    onClose();
  };
  return (
    <div className="max-w-[300px] bg-gray-400 absolute left-[41%] top-[50%] z-40 rounded-lg">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-l font-bold p-2">Add Car</h1>
        <MdCancel
          onClick={onClose}
          className="cursor-pointer text-red-500 absolute right-2"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col text-center p-4">
        <label htmlFor="make">Make</label>
        <input
          type="text"
          id="make"
          name="make"
          value={car.make}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <label htmlFor="model">Model</label>
        <input
          type="text"
          id="model"
          name="model"
          value={car.model}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <label htmlFor="maxMiles">Max Miles</label>
        <input
          type="number"
          id="maxMiles"
          name="maxMiles"
          value={car.maxMiles}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <label htmlFor="charge">Charge</label>
        <input
          type="number"
          id="charge"
          name="charge"
          value={car.charge}
          max={100}
          min={1}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <label htmlFor="fastCharge">Fast Charge</label>
        <div className="flex justify-center gap-4">
          <input
            type="radio"
            id="fastChargeTrue"
            aria-label="FastChargeTrue"
            name="fastCharge"
            value="true"
            checked={car.fastCharge === "true"}
            onChange={handleChange}
          />{" "}
          Yes
          <input
            type="radio"
            id="fastChargeFalse"
            name="fastCharge"
            value="false"
            checked={car.fastCharge === "false"}
            onChange={handleChange}
          />{" "}
          No
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCarModal;
