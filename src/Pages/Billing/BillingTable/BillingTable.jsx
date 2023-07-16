import axios from 'axios';
import { useEffect, useState } from 'react';

function BillingTable() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/billing-list');
        console.log(response.data); // Check the value of data
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  


  return (
    <div>
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
        {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">{item._id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{item.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

        </tbody>
      </table>

    </div>
  );
}

export default BillingTable;
