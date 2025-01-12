import fetchFirebaseData from '@/lib/fetchFirebaseData';
import db from '@/lib/firebaseClient';

export async function GET(req, res) {
    const path = "data"
    try {
        const data = await fetchFirebaseData(path, db)
        if (data) {
            return new Response(JSON.stringify({ data }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'No data found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                });
        }
    } catch (error) {
        console.error('Error reading data:', error);
        return new Response(JSON.stringify({ error: 'Failed to retrieve data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}