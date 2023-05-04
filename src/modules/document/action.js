const Response = require('../../utils/ApiResponse');
const { download } = require('../../utils/file');
const { documentSchema, updateDocumentSchema } = require('../../utils/validator');
const { postDocumentService, getDocumentService, getDocumentListService, deleteDocumentService, editDocumentService } = require('./service');

/**
 * @swagger
 * /documents/list:
 *  get:
 *    description: Get document list
 *    tags:
 *      - Document
 *    summary: Get document list
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 128
 *                  filePath:
 *                    type: string
 *                    example: "ТЕСТОВОЕ ЗАДАНИЕ NODE.JS.pdf"
 *                  email:
 *                    type: string
 *                    example: "example@example.com"
 *                  fileName:
 *                    type: string
 *                    example: "documents/invoice.pdf"
 *                  originalFilename:
 *                    type: string
 *                    example: "invoice.pdf"
 *                  filePreviewPath:
 *                    type: string
 *                    example: "images/preview128.jpg"
 */
module.exports.getDocumentsList = async (req, res) => {
    const list = await getDocumentListService();
    return res.json(new Response().data(list));
};

/**
 * @swagger
 * /documents/{id}:
 *  get:
 *    description: Get document by ID
 *    tags:
 *      - Document
 *    summary: Get document by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The document ID
 *        schema:
 *          type: number
 *          example: 1
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 128
 *                filePath:
 *                  type: string
 *                  example: "ТЕСТОВОЕ ЗАДАНИЕ NODE.JS.pdf"
 *                email:
 *                  type: string
 *                  example: "example@example.com"
 *                fileName:
 *                  type: string
 *                  example: "documents/invoice.pdf"
 *                originalFilename:
 *                  type: string
 *                  example: "invoice.pdf"
 *                filePreviewPath:
 *                  type: string
 *                  example: "images/preview128.jpg"
 */
module.exports.getSingleDocument = async (req, res) => {
    const id = req.params.id;
    const file = await getDocumentService(id);
    return res.json(new Response().data(file));
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
    const { error } = documentSchema.validate(req.body);
    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json(errors);
    }
    const file = req.files.document;
    await postDocumentService(req.body.email, req.body.title, file);
    return res.json(new Response().ok(1));
};

/**
 * @swagger
 * /documents/{id}/download:
 *  get:
 *    description: Download document by ID
 *    tags:
 *      - Document
 *    summary: Download document by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The document ID
 *        schema:
 *          type: number
 *          example: 1
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
module.exports.downloadDocument = async (req, res) => {
    const id = req.params.id;
    
    const document = await getDocumentService(id);
    res.setHeader('content-type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + document.fileName + '.pdf');

    const file = download(document.filePath);
    file.pipe(res);
};

/**
 * @swagger
 * /documents/{id}:
 *  delete:
 *    description: Delete the document by ID
 *    tags:
 *      - Document
 *    summary: Delete the document by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The document ID
 *        schema:
 *          type: number
 *          example: 1
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
module.exports.deleteSingleDocument = async (req, res) => {
    await deleteDocumentService(req.params.id);
    return res.json(new Response().ok(1));
};

/**
 * @swagger
 * /documents/{id}:
 *  put:
 *    description: Update document title
 *    tags:
 *      - Document
 *    summary: Update document title
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The document ID
 *        schema:
 *          type: number
 *          example: 1
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
 *            required:
 *              title
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 */
module.exports.editSingleDocument = async (req, res) => {
    const { error } = updateDocumentSchema.validate({ title: req.body.title });
    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json(errors);
    }
    
    await editDocumentService(req.params.id, req.body.title);
    return res.json(new Response().ok(1));
};