import express from 'express';

const router = express.Router()

router.get('/trending', getTrendingMovies)


export default router