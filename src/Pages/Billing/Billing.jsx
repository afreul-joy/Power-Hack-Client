import BillingTable from "./BillingTable/BillingTable";

const Billing = () => {
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Bill
        </button>
      </div>

      <BillingTable></BillingTable>
    </div>
  );
};

export default Billing;
