// Import necessary modules from Appwrite SDK
import { Client, Databases, ID, Query } from "appwrite";
import { Movie } from "../types/movie";

// Retrieve Appwrite project and database information from environment variables
const APPWRITE_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID; 
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Create a new Appwrite client instance
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Set your Appwrite endpoint
    .setProject(APPWRITE_ID) // Set your Appwrite project ID
;

// Define the type for the movie properties that will be used
type MovieProps = Pick<Movie, 'id' | 'poster_path'>

export type TrendingMovieProps = {
    $id: string;
    count: number;
    movie_id: number;
    poster_url: string;
    searchTerm: string;
    $updatedAt: string;
}

// Initialize the Appwrite Databases service with the client
const databases = new Databases(client);

// Function to update the search count for a specific search term
export const updateSearchCount = async (searchTerm: string, movie: MovieProps ) => {
    try {
       // Query the database for documents with the matching searchTerm
       const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', searchTerm), // Query to match the searchTerm
       ])

       // If the search term already exists in the database
       if (result.documents.length > 0) {
        const doc = result.documents[0]; // Get the first matching document
        // Update the search count by incrementing it by 1
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
            count: doc.count + 1, // Increment the count field
        });
    
   }else{
        // If the search term does not exist, create a new document
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm, // Store the search term
            count: 1,   // Initialize the count as 1
            movie_id: movie.id, // Store the movie ID
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Generate and store the poster URL
        });
   }
    } catch (error) {
        // Catch and log any errors that occur during the database operations
        console.error('Error updating search count:', error);
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovieProps[] | []> => { 
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(10), // Limit the number of results to 10
            Query.orderDesc('count'), // Order the results by count in descending order
            
        ]);
       if (result && result.documents.length > 0) {
        
        const trendingMovies: TrendingMovieProps[] = result.documents.map(doc => ({
            $id: doc.$id, // assuming Document has this field
            count: doc.count || 0, // or some default value if not present
            movie_id: doc.movie_id || 0, // handle default value if needed
            poster_url: doc.poster_url || "", // handle default value if needed
            searchTerm: doc.searchTerm || "", // handle default value if needed
            $updatedAt: doc.$updatedAt || "", // handle default value if needed
          }));
        return trendingMovies; // Return the list of trending movies
       }
       return [];
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }

}