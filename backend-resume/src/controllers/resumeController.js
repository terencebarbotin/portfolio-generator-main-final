const resumeService = require('../services/resumeService');
const responseHandler = require('../middlewares/responseHandler');

exports.generateResumePdf = async (req, res, next) => {
    const { id } = req.params;

    try {
        const portfolio = await resumeService.getById(id);

        const pdfBuffer = await resumeService.generateResumePdf(portfolio);
        const filename = await resumeService.writePdfToFile(pdfBuffer, portfolio);
        
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const pdfUrl = `${baseUrl}/api/resume/view/${filename}`;

        responseHandler.createResponse(res, 200, "Resume successfully generated", {url: pdfUrl}, null);
        console.log(`[INFO] Resume generated for portfolio ${id}`);
    } catch (error) {
        next(error);
    }
};

exports.viewResumePdfByFilename = async (req, res, next) => {
    const { filename } = req.params;

    try {
        const pdfBuffer = await resumeService.viewResumePdfByFilename(filename);

        if(!pdfBuffer) {
            return responseHandler.createResponse(
                res, 
                404, 
                "Resume not found",
                null, 
                responseHandler.errorDetails(404, "Wrong filename")
            );
        }

        responseHandler.createResponse(res, 200, "Resume successfully retrieved", null, null, pdfBuffer, filename);
        console.log(`[INFO] Resume ${filename} retrieved`);
    } catch (error) {
        next(error);
    }
};
