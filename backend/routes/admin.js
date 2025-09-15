const express = require("express");
const router = express.Router();
const { 
    createArticle,
    getAllArticles,
    addArticleImage,
    deleteArticleImage,
    editArticle,
    deleteArticle,
    searchArticles,
    getAllUsers,
    editUserDetailsAdmin,
    deleteUserAdmin
} = require('../controllers/adminController');

const auth = require("../middlewares/auth");

router.route('/admin/article/create').post(auth, createArticle)
router.route('/admin/article/update/:id').put(auth, editArticle)
router.route('/admin/article/delete/:id').delete(auth, deleteArticle)
router.route('/admin/article/images/upload/:id').post(auth, addArticleImage)
router.route('/admin/article/images/delete/:id').post(auth, deleteArticleImage)
router.route('/articles/all').get(getAllArticles)
router.route('/articles/search').get(searchArticles)

router.route('/admin/users/all').get(auth, getAllUsers)

router.route('/admin/user/update/:id').put(auth, editUserDetailsAdmin)
router.route('/admin/user/delete/:id').delete(auth, deleteUserAdmin)


module.exports = router;