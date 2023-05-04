import express from 'express';

const router = express.Router();

router.post('/post', async (req, res) => {
  try {
    console.log(req.body);
    res.status(201).json({ message: '' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
