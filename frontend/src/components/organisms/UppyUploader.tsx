import Dashboard from '@uppy/react/dashboard';
import Uppy from '@uppy/core';
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import { useState } from 'react';
import Tus from '@uppy/tus';

export default function UppyUploader(){
    const [uppy] = useState(()=>{
        return new Uppy({
            restrictions: {maxNumberOfFiles: 5},
        }).use(Tus,{
            endpoint:'https://tusd.tusdemo.net/files/',
        });
    });
    return(
        <div>
            <Dashboard uppy={uppy}/>
        </div>
    );
}
