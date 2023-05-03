const Response = require('../../utils/ApiResponse');

module.exports.getDocumentsList = async (req, res) => {
    return res.json(new Response().data({ list: [ 3,4,5,6,8,5,3,5,6,5 ] }));
};

module.exports.getSingleDocument = async (req, res) => {
    return res.json(new Response().data({ id: req.params.id }));
};

module.exports.postDocument = async (req, res) => {
    const file = req.file;
    console.log(file);

    return res.json(file);
};
