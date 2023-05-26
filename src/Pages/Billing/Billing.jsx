import { useEffect, useState } from "react";
import axios from "axios";

const Billing = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleModal = (id = null) => {
    if (id) {
      // Find the selected item from the table data
      const selectedItem = tableData.find((item) => item._id === id);
      if (selectedItem) {
        setFormData({
          name: selectedItem.name,
          email: selectedItem.email,
          phone: selectedItem.phone,
          amount: selectedItem.amount,
        });
      }
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        amount: "",
      });
    }
    setSelectedItemId(id);
    setModalOpen(true);
  };
  

  const handleBill = () => {
    setModalOpen(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      amount: "",
    });
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    //console.log(e.target.value, e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // ---------------  PUT--------------------------------
      if (selectedItemId) {

        const url = `http://localhost:3000/api/update-billing/${selectedItemId}`;
        const response = await axios.put(url, formData);

        if (response.data.success) {
          // Add the new record to the table data
          setTableData((prevData) => [...prevData, response.data.data]);
        }

        console.log(response.data);
      }
      //--------------------- POST------------------
      else {
        const url = "http://localhost:3000/api/add-billing";
        const response = await axios.post(url, formData);
        if (response.data.success) {
        // Add the new record to the form data
        setFormData(response.data.data);
          // Add the new record to the table data
          setTableData((prevData) => [...prevData, response.data.data]);
        }
      }
      setModalOpen(false);
      setSelectedItemId(null); // Reset the selected item ID
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

 // ----------get---------
 const getData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/billing-list");
    setTableData(response.data.data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

// Re render useEffect is very important for newly added record
useEffect(() => {  
  getData();
}, [tableData]);


  //----------------------- DELETE---------

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete-billing/${id}`);
      // Remove the deleted record from the table data
      setTableData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
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
          onClick={handleBill}
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

      {/* ---------TABLE---------   */}
      <table className="border border-gray-300 mx-auto container">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Billing ID</th>
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Paid Amount</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="border border-gray-300 px-4 py-2" colSpan="6">
                Loading..
              </td>
            </tr>
          ) : (
            <>
              {Array.isArray(tableData) && tableData.length > 0 ? (
                tableData.map((item) => (
                  <tr key={item._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {isLoading ? <div>Generating Id...</div> : item._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {" "}
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.amount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleModal(item._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Billing;
