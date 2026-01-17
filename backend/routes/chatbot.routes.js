import { Router } from "express";
const router = Router();

import { chatWithBot } from "../controllers/chatbot.controller.js";

router.route('/').post(chatWithBot);

export default router