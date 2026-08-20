const BlogPost = require('../models/BlogPost');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 9;
    const skip = (pageNum - 1) * limitNum;

    const total = await BlogPost.countDocuments(query);
    const blogs = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    const relatedBlogs = await BlogPost.find({
      category: blog.category,
      _id: { $ne: blog._id },
      isPublished: true
    })
      .limit(3)
      .select('title slug coverImage createdAt readTime category');

    res.json({
      success: true,
      data: blog,
      relatedBlogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post (Admin)
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res, next) => {
  try {
    let slug = slugify(req.body.title);
    const exists = await BlogPost.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now().toString().slice(-4)}`;

    const blog = await BlogPost.create({
      ...req.body,
      slug
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post (Admin)
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post (Admin)
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    await blog.deleteOne();
    res.json({
      success: true,
      message: 'Blog post deleted'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
};
