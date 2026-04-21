import { upload } from "../middleware/upload.middleware.js";
import { Router } from "express";
import { parseFile } from "../controllers/sheetUpload.controller.js";

const router = Router();

router.post('/upload', upload.single('excel_file'),parseFile);

export default router