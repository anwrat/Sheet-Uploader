import Dashboard from '@uppy/react/dashboard';
import Uppy from '@uppy/core';
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import { useState } from 'react';
import Tus from '@uppy/tus';

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function UppyUploader(){
    const [uppy] = useState(()=>{
        return new Uppy({
            restrictions: {maxNumberOfFiles: 5},
        }).use(Tus,{
            endpoint:`${baseURL}/files/`,
        });
    });
    return(
        <div>
            <Dashboard uppy={uppy}/>
        </div>
    );
}
