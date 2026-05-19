import {useState, useEffect} from 'react';
import {
  useUploadFileMutation,
  useLazyGetUploadJobsQuery
} from "../../utils/api";

export default function UploadQueue(){
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadFile] = useUploadFileMutation();
    const [fetchJobs, { data }] = useLazyGetUploadJobsQuery();
    const [polling, setPolling] = useState(false);
    const uploads = data?.job || [];

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("excel_file", selectedFile);
        fetchJobs(null, false);

        try {
        setPolling(true);
        uploadFile(formData).unwrap();
        fetchJobs(null, false);
        setSelectedFile(null);
        } catch (err) {
        console.error(err);
        }
    };


    useEffect(() => {
        if(polling === false) return;
        const interval = setInterval(() => {
        fetchJobs(null, false);
        const processingCount = uploads.filter(
            (job:any) => job.status === "processing"
        ).length;
        if(processingCount === 0){
            //Fetch jobs one last time to get completed jobs if missed
            fetchJobs(null,false);
            setPolling(false);
            clearInterval(interval);
        };
        }, 2000); //Increasing polling to 2 seconds to allow the processingCount to fetch the new UploadJob without stopping the poll, might need to increase this time/change the logic
        return () => clearInterval(interval);
    }, [uploads, fetchJobs]);

    return(
        <>
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

            <div className="flex gap-4">

                <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e)=>
                    setSelectedFile(
                    e.target.files?.[0] || null
                    )
                }
                className="border p-2 rounded-lg flex-1"
                />

                <button
                onClick={handleFileUpload}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                Upload
                </button>

            </div>

            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-5">
                Upload Queue
            </h2>

            <div className="space-y-5">
                {uploads.map((file:any)=>{

                const progress =
                    file.totalRows
                    ? Math.round(
                        (file.processedRows/file.totalRows)*100
                        )
                    : 0;

                return (
                    <div
                    key={file.id}
                    className="border rounded-xl p-4"
                    >

                    <div className="flex justify-between mb-3">
                        <p>{file.fileName}</p>
                        <span>{file.status}</span>
                    </div>

                    <div className="w-full bg-gray-200 h-3 rounded-full">
                        <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{
                            width:`${progress}%`
                        }}
                        />
                    </div>

                    <p className="mt-2 text-sm">
                        {progress}% complete
                    </p>

                    </div>
                )

                })}
            </div>

            </div> 
        </>
    );
}