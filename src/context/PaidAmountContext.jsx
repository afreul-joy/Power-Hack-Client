/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PaidAmountContext = createContext();

// PaidAmountProvider
export const PaidAmountProvider = ({ children }) => {
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);

  const addToTotalPaidAmount = (amount) => {
    console.log("addToTotalPaidAmount:", amount);
    setTotalPaidAmount((prevAmount) => prevAmount + amount);
  };

  const subtractFromTotalPaidAmount = (amount) => {
    console.log("subtractFromTotalPaidAmount:", amount);
    setTotalPaidAmount((prevAmount) => prevAmount - amount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/billing-list"
        );
        const data = response.data.data;
        // Calculate the total paid amount from the table data
        const initialTotalPaidAmount = data.reduce(
          (total, item) => total + item.amount,
          0
        );
        setTotalPaidAmount(initialTotalPaidAmount);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const paidAmountContextValue = {
    totalPaidAmount,
    addToTotalPaidAmount,
    subtractFromTotalPaidAmount,
  };

  return (
    <PaidAmountContext.Provider value={paidAmountContextValue}>
      {children}
    </PaidAmountContext.Provider>
  );
};
