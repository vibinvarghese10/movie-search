const APIKEY = "47de2b9e8b2462b53975d18185ac40bf";
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${APIKEY}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${APIKEY}&with_networks=213`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${APIKEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${APIKEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${APIKEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${APIKEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${APIKEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${APIKEY}&with_genres=99`,
};

export default requests;
