import express from "express";
import { getSimilarTvs,
         getTrendingTv,
         getTvDetails,
         getTvsByCatagory,
         getTvTrailers 
    } from "../controller/tv.controller.js";


const router = express.Router();

router.get('/trending', getTrendingTv);
router.get('/:id/trailers', getTvTrailers);
router.get('/:id/details', getTvDetails);
router.get('/:id/similar', getSimilarTvs);
router.get('/:catagory', getTvsByCatagory);


export default router