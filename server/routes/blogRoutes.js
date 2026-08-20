const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.route('/')
  .get(getBlogs)
  .post(protect, admin, createBlog);

router.get('/slug/:slug', getBlogBySlug);

router.route('/:id')
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

module.exports = router;
