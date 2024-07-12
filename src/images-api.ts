import axios from 'axios';


const UNSPLASH_ACCESS_KEY = 'E1cdy3dv_KADegi36FDRDy7wAcwRFX8WkgPlx-8266g';

async function getImages(query: string, perPage = 10, page = 1) {
    const url = `https://api.unsplash.com/search/photos`;

    try {
        const response = await axios.get(url, {
            params: {
                query: query,
                per_page: perPage,
                page: page
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });

        return response.data.results;
    } catch (error) {
        throw new Error;
    }
}


export default getImages;