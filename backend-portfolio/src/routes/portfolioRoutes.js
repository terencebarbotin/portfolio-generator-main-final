const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");
const portfolioValidator = require("../middlewares/portfolioValidator");

/**
 * @swagger
 * tags:
 *   name: Portfolios
 *   description: API for managing portfolio entries
 */

/**
 * @swagger
 * /portfolios:
 *   get:
 *     summary: Get all portfolio entries
 *     description: Retrieve the complete list of portfolios.
 *     tags: [Portfolios]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of portfolios
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
 *                   example: List of portfolios successfully retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     jobRole:
 *                       type: string
 *                     email:
 *                       type: string
 *                     github:
 *                        type: string
 *                     linkedin:
 *                        type: string
 *                     skills:
 *                        type: array
 *                        items:
 *                          type: string
 *                          example: ["Node.js", "Express", "MongoDB"]
 *                     experiences:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                             title:
 *                               type: string
 *                             description:
 *                               type: string
 *                             skills:
 *                               type: array
 *                             items:
 *                               type: string
 *                             isProject:
 *                               type: boolean
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
 */
router.get('/', portfolioController.getAllPortfolios);


/**
 * @swagger
 * /portfolios/{id}:
 *   get:
 *     summary: Get a portfolio by ID
 *     description: Retrieve a single portfolio based on the provided ID.
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the portfolio to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the portfolio
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
 *                   example: Portfolio successfully retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     jobRole:
 *                       type: string
 *                     email:
 *                       type: string
 *                     github:
 *                        type: string
 *                     linkedin:
 *                        type: string
 *                     skills:
 *                        type: array
 *                        items:
 *                          type: string
 *                          example: ["Node.js", "Express", "MongoDB"]
 *                     experiences:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                             title:
 *                               type: string
 *                             description:
 *                               type: string
 *                             skills:
 *                               type: array
 *                             items:
 *                               type: string
 *                             isProject:
 *                               type: boolean
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
 *                       example: Wrong id
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
 */
router.get('/:id', portfolioController.getAPortfolioById);


/**
 * @swagger
 * /portfolios:
 *   post:
 *     summary: Create a new portfolio
 *     description: Create a new portfolio entry with all required and optional fields.
 *     tags: [Portfolios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - jobRole
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the portfolio owner
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: Contact email address
 *                 format: email
 *                 example: "john.doe@example.com"
 *               jobRole:
 *                 type: string
 *                 description: Job role or title
 *                 example: "Backend Engineer"
 *               bio:
 *                 type: string
 *                 description: Short biography or description
 *                 example: "Software Engineer passionate about backend development"
 *               github:
 *                 type: string
 *                 description: GitHub profile URL
 *                 example: "https://github.com/johndoe"
 *               linkedin:
 *                 type: string
 *                 description: LinkedIn profile URL
 *                 example: "https://www.linkedin.com/in/johndoe"
 *               skills:
 *                 type: array
 *                 description: List of skills
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "Express", "MongoDB"]
 *               experiences:
 *                 type: array
 *                 description: List of projects and/or professional experiences
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - description
 *                     - isProject
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Title of the project or experience
 *                       example: "E-commerce Platform"
 *                     description:
 *                       type: string
 *                       description: Detailed description of the project or experience
 *                       example: "Developed a scalable e-commerce platform using Node.js and MongoDB."
 *                     skills:
 *                       type: array
 *                       description: Skills used in the project or experience
 *                       items:
 *                         type: string
 *                       example: ["Node.js", "Express", "MongoDB"]
 *                     isProject:
 *                       type: boolean
 *                       description: Whether it's a project (true) or professional experience (false)
 *                       example: true
 *     responses:
 *       201:
 *         description: Portfolio successfully created
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
 *                   example: Portfolio successfully created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1                    
 *       400:
 *         description: Invalid or missing fields
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
 *                   example: Invalid or Missing fields
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       example: 400
 *                     details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           field:
 *                             type: string
 *                             example: name
 *                           message:
 *                             type: string
 *                             example: name is mandatory
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
 */
router.post('/', portfolioValidator, portfolioController.createPortfolio);


module.exports = router
