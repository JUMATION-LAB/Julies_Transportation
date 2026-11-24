const express = require('express');
const router  = express.Router();

const {authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');
const { uploadImage } = require('../middleware/uploadImage');
const { asyncHandler } = require('../utils/asyncHandler');
const uploadService  = require('../services/uploadService');

router.post(
    '/uploads/test',
    authenticate,
    authorize('admin'),
    uploadImage.single('file'),
    asyncHandler(async (req, res) => {
        const result = await uploadService.uploadImage(req.file);

        return res.status(201).json({
            success: true,
            message: 'Image uploaded successfully.',
            data: result
        });
    })
);



module.exports = router;



