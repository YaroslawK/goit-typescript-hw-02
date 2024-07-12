// import axios from 'axios';

// const UNSPLASH_ACCESS_KEY = 'E1cdy3dv_KADegi36FDRDy7wAcwRFX8WkgPlx-8266g';

// interface Image {
//   id: string;
//   url: string;
//   title: string;
// }

// interface UnsplashResponse {
//   results: Image[];
// }

// async function getImages(query: string, perPage: number = 10, page: number = 1): Promise<Image[]> {
//     const url = `https://api.unsplash.com/search/photos`;

//     try {
//         const response = await axios.get<UnsplashResponse>(url, {
//             params: {
//                 query: query,
//                 per_page: perPage,
//                 page: page
//             },
//             headers: {
//                 Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
//             }
//         });

//         return response.data.results;
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error(error.message);
//         } else {
//             console.error('Unknown error', error);
//         }
//         throw error;
//     }
// }

// export default getImages;

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