const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const userData = await Category.findAll({include: {
      model: Product}});
    if (!userData) {
      res.status(404).json({ message: 'No categories found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
}});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const userData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!userData) {
      res.status(404).json({ message: 'No categories found with that id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async(req, res) => {
  // create a new category
  try {
    const userData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const userData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No categories found with that id!'});
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const userData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No categories found with that id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
