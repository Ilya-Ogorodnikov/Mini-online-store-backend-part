const Router = require('express');
const categoriesRouter = new Router();
const CategoriesController = require('../../controllers/categories');
const validation = require('../../middlewares/validation');
const { categorySchema, toggleDeleteSchema } = require('../../helpers/validation-schemas');

categoriesRouter.get('/categories/all', CategoriesController.allCategories);
categoriesRouter.post('/categories/add',
  validation(categorySchema),
  CategoriesController.addNewCategory
);
categoriesRouter.patch('/categories/edit', 
  validation(categorySchema),
  CategoriesController.editCategory
);
categoriesRouter.patch('/categories/toggleIsDelete', 
  validation(toggleDeleteSchema),
  CategoriesController.toggleIsDelete
);

module.exports = categoriesRouter;