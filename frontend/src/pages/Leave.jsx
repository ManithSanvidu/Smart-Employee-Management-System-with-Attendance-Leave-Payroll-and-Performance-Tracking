import { useState } from "react";

const Leave = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaves] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    attachment: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formPayload.append(key, formData[key]);
      }
    });

    console.log("Leave Application Submitted:", formData);
    void formPayload;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Leave application submitted successfully!");

    setFormData({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      attachment: null,
    });
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      attachment: null,
    });
  };

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Leave Management</h1>

      <div className="mb-8 rounded-2xl bg-white p-6 shadow">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-indigo-700"
        >
          + Apply New Leave
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Employee ID</th>
                <th className="px-6 py-4 text-left">Employee Name</th>
                <th className="px-6 py-4 text-left">Leave Type</th>
                <th className="px-6 py-4 text-center">Start Date</th>
                <th className="px-6 py-4 text-center">End Date</th>
                <th className="px-6 py-4 text-center">Number of Days</th>
                <th className="px-6 py-4 text-center">Reason</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono">{leave.employeeId}</td>
                  <td className="px-6 py-4 font-medium">{leave.name}</td>
                  <td className="px-6 py-4 text-gray-600">{leave.leaveType}</td>
                  <td className="px-6 py-4 text-gray-600">{leave.startDate}</td>
                  <td className="px-6 py-4 text-gray-600">{leave.endDate}</td>
                  <td className="px-6 py-4 text-gray-600">{leave.numberOfDays}</td>
                  <td className="px-6 py-4 text-gray-600">{leave.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white shadow-2xl">
            <div className="p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Apply New Leave</h2>
                <button
                  onClick={closeModal}
                  className="text-3xl leading-none text-gray-500 hover:text-gray-700"
                >
                  x
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Leave Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Leave Type</option>
                      <option value="Annual">Annual Leave</option>
                      <option value="Sick">Sick Leave</option>
                      <option value="Casual">Casual Leave</option>
                      <option value="Maternity">Maternity Leave</option>
                      <option value="Paternity">Paternity Leave</option>
                      <option value="Unpaid">Unpaid Leave</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Number of Days</label>
                    <input
                      type="text"
                      value={
                        formData.startDate && formData.endDate
                          ? Math.ceil(
                              (new Date(formData.endDate) - new Date(formData.startDate)) /
                                (1000 * 60 * 60 * 24)
                            ) + 1
                          : ""
                      }
                      disabled
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Please explain your reason for leave..."
                    className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Attachment (Optional)</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-6 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    You can upload medical certificate, documents etc. (PDF, JPG, PNG)
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-indigo-400"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
