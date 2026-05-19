import Button from '../atoms/Button';
import {useState, useEffect} from 'react';
import {useUploadFileMutation, useLazyGetUploadJobsQuery} from '../../utils/api';

export default function UploadItem({ file }: { file: any }) {
  const progress =
    file.progress?.percentage || 0;

  const state = file.progress?.uploadComplete
    ? "completed"
    : file.progress?.uploadStarted
    ? "uploading"
    : "queued";
  
  const [uploadFile, {isLoading}] = useUploadFileMutation();
  const [fetchJobs, { data }] = useLazyGetUploadJobsQuery();
  const [polling, setPolling] = useState(false);
  const uploads = data?.job || [];
  const uploadForCurrentFile = uploads.find((upload:any)=>upload.fileName === file.name);
  const dbProgress = uploadForCurrentFile?.totalRows? Math.round((uploadForCurrentFile.processedRows/uploadForCurrentFile.totalRows)*100):0;

  const handleFileUpload = async() =>{
    try{
      setPolling(true);
      await uploadFile({
        uploadUrl: file.uploadURL,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
      });
    }catch(err){
      console.error(err);
    }
  } 

  useEffect(() => {
      if(!polling) return;
      const interval = setInterval(() => {
        fetchJobs(null, false);
        if(uploadForCurrentFile?.status === 'completed'){
            //Fetch jobs one last time to get completed jobs if missed
            fetchJobs(null,false);
            console.log(uploads);
            setPolling(false);
            clearInterval(interval);
        };
      }, 2000); //Increasing polling to 2 seconds to allow the processingCount to fetch the new UploadJob without stopping the poll, might need to increase this time/change the logic
      return () => clearInterval(interval);
  }, [uploads, fetchJobs]);

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex justify-between">
        <p className="font-medium">{file.name}</p>

        <p className="text-sm text-gray-500">
          {state}
        </p>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between">
        <span className="text-sm">{progress}%</span>

        {state === "completed" && (
          <Button
            className="text-green-600 text-sm font-medium"
            onClick={handleFileUpload}
            disabled = {isLoading}
          >
            {isLoading? "Saving..": "Save to DB"}
          </Button>
        )}
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${dbProgress}%` }}
        />
      </div>

      <div className="flex justify-between">
        <span className="text-sm">{dbProgress}%</span>
      </div>
    </div>
  );
}