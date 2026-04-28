import { useState } from "react";
import { useUploadFileMutation, useGetUploadJobsQuery} from "./utils/api";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFile] = useUploadFileMutation();
  const {data, isLoading, error} = useGetUploadJobsQuery(undefined,
    {
      pollingInterval: 1000,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });
  const handleFileUpload = () =>{
    if(!selectedFile) return;
    const formData = new FormData();
    formData.append('excel_file', selectedFile);
    try{
      const job = uploadFile(formData).unwrap();
      setSelectedFile(null);
    }catch(err){
      console.error('File upload failed: ',err);
    }
  }

  const uploads = data?.job || [];

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
              onChange={(e)=>setSelectedFile(e.target.files?.[0] || null)}
            />

            <button
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              onClick={handleFileUpload}
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
            {uploads.map((file: any) => {
              const progress = file.totalRows? Math.round((file.processedRows / file.totalRows) * 100): 0;
              return(
                <div
                  key={file.id}
                  className="border rounded-xl p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-medium">
                      {file.fileName}
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
                        width: `${progress}%`
                      }}
                    />
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {progress}% complete
                  </p>
                </div>
              )
  })}
          </div>

        </div>

      </div>
    </div>
  )
}

export default App