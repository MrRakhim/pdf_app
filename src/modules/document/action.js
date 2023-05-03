const Response = require('../../utils/ApiResponse');
const { postDocumentService, getDocumentService } = require('./service');

module.exports.getDocumentsList = async (req, res) => {
    return res.json(new Response().data({ list: [ 3,4,5,6,8,5,3,5,6,5 ] }));
};

module.exports.getSingleDocument = async (req, res) => {
    const id = req.params.id;
    const file = await getDocumentService(id);
    file.pipe(res);
};

/**
 * @swagger
 * /documents/upload:
 *  post:
 *    description: Upload documents
 *    tags:
 *      - Document
 *    summary: Upload documents
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: Document title
 *                example: Invoice
 *              email:
 *                type: string
 *                description: User's email
 *                example: rz.aimaganbetov@gmail.com
 *              document:
 *                type: string
 *                description: The document
 *                format: binary
 *            required:
 *              document
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 */
module.exports.postDocument = async (req, res) => {
    const file = req.files.document;
    await postDocumentService(req.body.email, req.body.title, file);
    return res.json(new Response().ok(1));
};
