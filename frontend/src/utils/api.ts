import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: `${baseURL}/api/sheet`}),
    endpoints: (builder)=>({
        uploadFile: builder.mutation({
            query: (formData)=>{
                return{
                    url: '/upload',
                    method: 'POST',
                    body: formData,
                }
            }
        }),  
        getUploadJobs: builder.query({
            query: () =>({
                url: '/job',
            })
        }),
        // updateJob: builder.mutation({
        //     query:({jobId, updates})=>{
        //         return{
        //             url: `/job/${jobId}`,
        //             method: 'PUT',
        //             body: updates,
        //         }
        //     }
        // })
    })
});

export const {useUploadFileMutation, useLazyGetUploadJobsQuery} = api;