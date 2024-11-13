
import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingMovie(req, res) {
    try {
        // Corrected `fetchFromTMDB` usage, assuming it returns a promise
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");

        // Ensure data has results and calculate a random movie
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        // Send the random movie as a response
        res.json({ success: true, content: randomMovie });

    } catch (error) {
        // Corrected `res.status` usage instead of `res.results`
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMovieTrailers(req, res) {
    const {id} = req.params;
    
    try {
         // Corrected `fetchFromTMDB` usage, assuming it returns a promise
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
            // Send the random movie as a response
        res.json({ success: true, trailers: data.results });

    } catch (error) {
        // Corrected `res.status` usage instead of `res.results`
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
       
         res.status(500).json({ success: false, message: "Internal Server Error" });
          
    }
    
}

export async function getMovieDetails(req, res) {
    const {id} = req.params
      
    try {
         // Corrected `fetchFromTMDB` usage, assuming it returns a promise
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
         res.status(200).json({success: true, content: data})

        } catch (error) {
        // Corrected `res.status` usage instead of `res.results`
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
       
         res.status(500).json({ success: false, message: "Internal Server Error" });
          
    }
    
}

export async function getSimilarMovies(req, res) {
    const {id} = req.params
      
    try {
         // Corrected `fetchFromTMDB` usage, assuming it returns a promise
         const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
         res.status(200).json({success: true, simlar: data.results})

        } catch (error) {
        // Corrected `res.status` usage instead of `res.results`
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
       
         res.status(500).json({ success: false, message: "Internal Server Error" });
          
    }
    
}

export async function getMoviesByCatagory(req, res) {
    const {catagory} = req.params
      
    try {
         // Corrected `fetchFromTMDB` usage, assuming it returns a promise
         const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${catagory}?language=en-US&page=1`);
         res.status(200).json({success: true, content: data.results})

        } catch (error) {
        // Corrected `res.status` usage instead of `res.results`
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
       
         res.status(500).json({ success: false, message: "Internal Server Error" });
          
    }
    
}



