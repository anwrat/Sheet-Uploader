import { upload } from "../middleware/upload.middleware.js";
import { Router } from "express";
import { parseFile, getAllUploadJobs} from "../controllers/sheetUpload.controller.js";

const router = Router();

router.post('/upload', upload.single('excel_file'),parseFile);
router.get('/job/', getAllUploadJobs);

export default router