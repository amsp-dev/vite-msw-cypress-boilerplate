import { http, delay, HttpResponse } from 'msw';
import data from './data.json';

const handlers =[
    http.get('/api/data', async ({ request }) => {
        // Get the sort parameter from the request url
        const url = new URL(request.url);
        const sort = url.searchParams.get('sort');
        
        // Simulate a delay when loading an API response...
        await delay(1000);

        // Apply sorting to data
        const sortedData = {
            ...data,
            results: data.results.sort((a, b) => {
                if( a.number !== undefined && b.number !== undefined ) {
                    if(sort === 'desc') {
                        return a.number < b.number ? 1 : -1;
                    } else if(sort === 'asc') {
                        return a.number > b.number ? 1 : -1;
                    } else {
                        return a.number
                    }
                } else {
                  return a.number !== undefined ? 1 : -1
                }
              })
        }
        return HttpResponse.json({
            ...sortedData
        })
    })
];

export default handlers
