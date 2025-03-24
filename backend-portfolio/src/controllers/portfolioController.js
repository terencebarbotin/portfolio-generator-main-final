const responseHandler = require("../middlewares/responseHandler");
const portfolioService = require("../services/portfolioService")

exports.getAllPortfolios = async (req, res, next) => {
    try {       
        const portfolios = await portfolioService.getAll();
        responseHandler.createResponse(res, 200, "List of portfolios successfully retrieved", portfolios);
        console.log("[INFO] List of portfolios retrieved")
    } catch (error) {
        next(error);
    }
};

exports.getAPortfolioById = async (req, res, next) => {
    const { id } = req.params;

    if(isNaN(id)) {
        return responseHandler.createResponse(
            res, 
            400,
            "Invalid id",
            null,
            responseHandler.errorDetails(400, "ID should be a number")
        );
    }

    try {
        const portfolio = await portfolioService.getById(id);
        
        if(!portfolio) {
            return responseHandler.createResponse(
                res, 
                404, 
                "Portfolio not found",
                null, 
                responseHandler.errorDetails(404, "Wrong id")
            );
        }

        responseHandler.createResponse(res, 200, "Porfolio successfully retrieved", portfolio);
        console.log(`[INFO] Portfolio ${id} retrieved`)
    } catch (error) {
        next(error);
    }
};

exports.createPortfolio = async (req, res, next) => {
    const body  = req.body;

    try {
        const newPortfolioId = await portfolioService.create(body);
        responseHandler.createResponse(res, 201, "Porfolio successfully created", {id : newPortfolioId});
        console.log("[INFO] Portfolio created");
    } catch (error) {
        next(error);
    }
};
