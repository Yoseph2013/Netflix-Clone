import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function searchPerson(req, res) {

    const { query } = req.params
    try{
        const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length === 0 ) {
            return res.status(404).send(null)
        } 

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistrory: {
                    id: response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType: "person",
                    createAt: new Date(),
                },
            },
        });
        res.status(200).json({success: true, content: response.results})

    }catch(error) {
        console.log("Error in searchPerson controller: ", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})

    }
    
};

export async function searchMovie(req, res) {
    const {query} = req.params
    try{
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if(response.results.length === 0 ) {
            return res.status(404).send(null)
        } 
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistrory: {
                    id: response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType: "Tv Show",
                    createAt: new Date(),
                },
            },
        });
        res.status(200).json({success: true, content: response.results})
        

    }catch(error) {
        console.log("Error in searchMovie controller: ", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
        
    }
    
};

export async function searchTv(req, res) {
    const {query} = req.params
    try{
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if(response.results.length === 0 ) {
            return res.status(404).send(null)
        } 
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistrory: {
                    id: response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType: "tv",
                    createAt: new Date(),
                },
            },
        });
        res.status(200).json({success: true, content: response.results})
        

    }catch(error) {
        console.log("Error in searchTv controller: ", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
        
    }
    
};

export async function getSearchHistory(req, res) {
    try{
        res.status(200).json({success: true, content: req.user.searchHistrory});
    }catch(error) {
        res.status(500).json({success: false, message: "Internale Server Error"})
    }
    
}

export async function removeItemFromSearchHistory(req,res) {
    const {id} = req.params;

    try{
          await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistrory: {id:id}
            },
         })
         res.status(200).json({success:true, message: "Item removed from search histry"})
    }
    catch(error) {
        console.log("Error in removeItemFromSearchHistory Controller: ", error.message);
        res.status(500).json({success: false, message: "Internal Server Error"})

    }
}