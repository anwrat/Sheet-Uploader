import Button from '../atoms/Button';
import {useUploadFileMutation} from '../../utils/api';

export default function UploadItem({ file }: { file: any }) {
  const progress =
    file.progress?.percentage || 0;

  const state = file.progress?.uploadComplete
    ? "completed"
    : file.progress?.uploadStarted
    ? "uploading"
    : "queued";
  
  const [uploadFile, {isLoading}] = useUploadFileMutation();
  const handleFileUpload = async() =>{
    try{
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
    </div>
  );
}