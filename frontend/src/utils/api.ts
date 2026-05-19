import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: `${baseURL}/api/sheet`}),
    endpoints: (builder)=>({
        uploadFile: builder.mutation({
            query: (data)=>{
                return{
                    url: '/save-to-db',
                    method: 'POST',
                    body: data,
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