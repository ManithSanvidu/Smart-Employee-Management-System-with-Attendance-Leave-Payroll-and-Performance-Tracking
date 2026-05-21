const Payroll = () => {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Payroll Management</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 text-center shadow">
          <h3 className="text-2xl font-bold text-green-600">Rs. 12,45,000</h3>
          <p className="text-gray-500">Total Payroll This Month</p>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
