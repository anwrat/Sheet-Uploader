function App() {

  const uploads = [
    {
      id: 1,
      name: "employees_q1.xlsx",
      progress: 45,
      status: "Uploading"
    },
    {
      id: 2,
      name: "payroll_april.xlsx",
      progress: 78,
      status: "Processing"
    },
    {
      id: 3,
      name: "staff_master.xlsx",
      progress: 100,
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">
          Sheet Uploader
        </h1>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Upload Excel File
          </h2>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".xlsx,.xls"
              className="border rounded-lg p-2 flex-1"
            />

            <button
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Upload
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            You can upload more files while others are processing.
          </p>
        </div>


        {/* Upload Queue */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-5">
            Upload Queue
          </h2>

          <div className="space-y-5">
            {uploads.map(file => (
              <div
                key={file.id}
                className="border rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-medium">
                    {file.name}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium `}
                  >
                    {file.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{
                      width: `${file.progress}%`
                    }}
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {file.progress}% complete
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default App