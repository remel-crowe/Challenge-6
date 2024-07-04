import axios from "axios";

export const getCars = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    const response = await axios.get(
      "https://challenge-6.onrender.com/garage",
      config
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const addCar = async (carData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    const response = await axios.post(
      "https://challenge-6.onrender.com/garage",
      carData,
      config
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const deleteCar = async (index) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    const response = await axios.delete(
      `https://challenge-6.onrender.com/garage/${index}`,
      config
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const updateCharge = async (index, charge) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("Token not found");
    const config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    const response = await axios.put(
      `https://challenge-6.onrender.com/garage/${index}`,
      { charge },
      config
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};
