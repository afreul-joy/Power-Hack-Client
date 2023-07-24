import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PaidAmountContext } from "../../context/PaidAmountContext";
import Pagination from "../../Components/Pagination/Pagination";
import "../../Components/Pagination/pagination.css";

const Billing = () => {
  // State variables
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  }); // Form data state
  const [data, setData] = useState([]); // Billing data state
  const [isLoading, setLoading] = useState(false); // Loading state
  const [selectedItemId, setSelectedItemId] = useState(null); // Selected item ID state
  const { addToTotalPaidAmount, subtractFromTotalPaidAmount } =
    useContext(PaidAmountContext);
  // Open the modal and populate the form data with the selected item
  const handleModal = (id = null) => {
    if (id) {
      // Find the selected item from the table data
      const selectedItem = data.find((item) => item._id === id);
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

  // Open the modal with an empty form
  const handleBill = () => {
    setModalOpen(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      amount: "",
    });
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

          // Email validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone number validation
    if (formData.phone.length !== 11 || isNaN(formData.phone)) {
      alert("Phone number should be 11 digits.");
      return;
    }
    
      if (selectedItemId) {
        // PUT operation for updating an existing record
        const url = `http://localhost:4000/api/update-billing/${selectedItemId}`;
        const response = await axios.put(url, formData);
        const responseData = response.data;

        if (responseData.success) {
          // Update the data state with the updated record
          setData((prevData) =>
            prevData.map((item) =>
              item._id === selectedItemId ? responseData.data : item
            )
          );
        }
      } else {
        // POST operation for adding a new record
        const url = "http://localhost:4000/api/add-billing";
        const response = await axios.post(url, formData);
        console.log(response);
        if (response.data.success) {
          const newRecord = response.data.data;
          addToTotalPaidAmount(newRecord.amount); // Add the amount to the total paid amount
          setFormData(newRecord); // Update the form data with the new record
          setData((prevData) => [...prevData, newRecord]); // Add the new record to the table data
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

  // Fetch billing data from the API
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/billing-list"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Fetch data on component mount and whenever data changes
  useEffect(() => {
    getData();
  }, [data]);

  // Handle deletion of a billing record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/delete-billing/${id}`);
      const deletedRecord = data.find((item) => item._id === id);
      if (deletedRecord) {
        subtractFromTotalPaidAmount(deletedRecord.amount); // Decrease the total paid amount by the deleted record's amount
        setData((prevData) => prevData.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //-------------------- PAGINATION SETUP--------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setPageSize(size);
    setCurrentPage(1); // Reset to the first page when changing page size
  };

  // Search text state
  const [searchText, setSearchText] = useState("");

  return (
    <div className="mx-auto container">
      {/* Billing header */}
      <div className="flex justify-between bg-slate-300 my-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Billing</h2>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 ml-4"
          />
        </div>
        {/* Add bill button */}
        <button
          onClick={handleBill}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Bill
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-20"></div>
          <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-white p-4 shadow-lg rounded">
              <h2 className="text-2xl font-bold mb-4">
                {selectedItemId !== null ? "Edit" : "ADD"}
              </h2>
              {/* Billing form */}
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
                {/* Submit and cancel buttons */}
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

      {/* Billing table */}
      <table className="border border-gray-300 mx-auto container">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Billing ID</th>
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
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
              {/* Render table rows */}
              {Array.isArray(currentData) && currentData.length > 0 ? (
                currentData
                  .filter((eachData) => {
                    return (
                      searchText.toLowerCase() === "" ||
                      eachData.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      eachData.email
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    );
                  })
                  .map((item) => (
                    <tr key={item._id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {isLoading ? <h2>Generating Id...</h2> : item._id}
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
                        {/* Edit and delete buttons */}
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
                  <td colSpan="6">Loading....</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>

      {/* Page Size select */}
      <div className="pagination-container">
        <label htmlFor="pageSize">Page Size: </label>
        <select
          className="page-size-select"
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <Pagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        data={data}
        pageSize={pageSize} // Pass pageSize as a prop
      />
    </div>
  );
};

export default Billing;
