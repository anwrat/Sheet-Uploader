import { useMemo } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const useUppyUploader = () => {
  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        maxNumberOfFiles: 5,
      },
    }).use(Tus, {
      endpoint: `${baseURL}/files`,
    });
  }, []);

  return uppy;
};