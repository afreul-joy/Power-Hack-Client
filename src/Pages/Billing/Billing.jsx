import { useState } from "react";
import BillingTable from "./BillingTable/BillingTable";

const Billing = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });

  const handleModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to server or update state
    console.log(formData);
    setModalOpen(false);
  };

  return (
    <div className="mx-auto container">
      <div className="flex justify-between bg-slate-300 my-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Billing</h2>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded px-4 py-2 ml-4"
          />
        </div>
        <button
          onClick={handleModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Bill
        </button>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-20"></div>
          <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-white p-4 shadow-lg rounded">
              <h2 className="text-2xl font-bold mb-4">Add Bill</h2>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="amount">Amount:</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      <BillingTable />
    </div>
  );
};

export default Billing;
