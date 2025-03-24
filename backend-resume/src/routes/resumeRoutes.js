const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

/**
 * @swagger
 * tags:
 *   name: Resume
 *   description: API for generating PDF resumes
 */

/**
 * @swagger
 * /resume/generate/{portfolioId}:
 *   post:
 *     summary: Generate a PDF resume
 *     description: Generates a PDF resume using the data from the portfolio corresponding to the provided ID.
 *     tags: [Resume]
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the portfolio to use for generating the resume
 *     responses:
 *       200:
 *         description: Resume successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Resume successfully generated
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: http://localhost:3001/api/resume/view/John_Doe_1_resume.pdf
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid id
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       example: 400
 *                     details:
 *                       type: string
 *                       example: ID should be a number
 *       404:
 *         description: Portfolio not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Portfolio not found
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       example: 404
 *                     details:
 *                       type: string
 *                       example: Portfolio ID not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     details:
 *                       type: string
 *                       example: Error generating PDF
 */
router.post("/generate/:id", resumeController.generateResumePdf);

/**
 * @swagger
 * /resume/view/{filename}:
 *   get:
 *     summary: View a generated resume PDF
 *     description: Displays a previously generated resume PDF in the browser using the filename.
 *     tags: [Resume]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The filename of the generated resume PDF
 *     responses:
 *       200:
 *         description: PDF displayed successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Resume not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Resume not found
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       example: 404
 *                     details:
 *                       type: string
 *                       example: Wrong filename
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     details:
 *                       type: string
 *                       example: Error retrieving the PDF
 */
router.get("/view/:filename", resumeController.viewResumePdfByFilename);

module.exports = router;
