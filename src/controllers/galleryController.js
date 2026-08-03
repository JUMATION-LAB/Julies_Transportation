const galleryService = require('../services/galleryService');
const { asyncHandler } = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const getGalleryItems = asyncHandler(async (req, res) => {
    const galleryItems = await galleryService.getGalleryItems();
    return successResponse(res, 200, 'Gallery items retrieved successfully.', galleryItems);
});

const getGalleryItem = asyncHandler(async (req, res) => {
    const galleryItem = await galleryService.getGalleryItem(req.params.id);
    return successResponse(res, 200, 'Gallery item retrieved successfully.', galleryItem);
});

const createGalleryItem = asyncHandler(async (req, res) => {
    const galleryItem = await galleryService.createGalleryItem(req.body);
    return successResponse(res, 201, 'Gallery item created successfully.', galleryItem);
});

const updateGalleryItem = asyncHandler(async (req, res) => {
    const galleryItem = await galleryService.updateGalleryItem(req.params.id, req.body);
    return successResponse(res, 200, 'Gallery item updated successfully.', galleryItem);
});

const deleteGalleryItem = asyncHandler(async (req, res) => {
    const galleryItem = await galleryService.deleteGalleryItem(req.params.id);
    return successResponse(res, 200, 'Gallery item deleted successfully.', galleryItem);
});

module.exports = {
    getGalleryItems,
    getGalleryItem,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
};