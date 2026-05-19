// import Dashboard from '@uppy/react/dashboard';
// import Uppy from '@uppy/core';
// import '@uppy/core/css/style.min.css';
// import '@uppy/dashboard/css/style.min.css';
// import { useState } from 'react';
// import Tus from '@uppy/tus';

// const baseURL = import.meta.env.VITE_BACKEND_URL;

// export default function UppyUploader(){
//     const [uppy] = useState(()=>{
//         return new Uppy({
//             restrictions: {maxNumberOfFiles: 5},
//         }).use(Tus,{
//             endpoint:`${baseURL}/files/`,
//         });
//     });
//     return(
//         <div>
//             <Dashboard uppy={uppy}/>
//         </div>
//     );
// }

import {useState} from 'react';
import Button from '../atoms/Button';
import UploadItem from '../molecules/UploadItem';
import {useUppyUploader} from '../../hooks/useUppyUploader';
import {UppyContextProvider} from '@uppy/react';
import {Dropzone, useUppyState, useDropzone} from '@uppy/react';

export default function UppyUploader(){
    const uppy = useUppyUploader();
    const files = useUppyState(uppy,(state)=>state.files);

    return(
        <UppyContextProvider uppy = {uppy}>
            <Dropzone />
            <Button onClick={()=>uppy.upload()}>Upload</Button>
            <div className='space-y-3'>
                {Object.values(files).map((file:any)=>(
                    <UploadItem key={file.id} file={file}/>
                ))}
            </div>
        </UppyContextProvider>
    );
}
