import cookie from 'cookie';

export default async (req, res) => {
    const searchString = req.query.search_string

    if (req.method === 'GET') {

        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/videos/?search=${searchString}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            const data = await apiResponse.json();

            if (data) {
                return res.status(200).json({ 
                    data
                 });
            } else {
                return res.status(apiResponse.status).json({
                    error: data.error
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Something went wrong when getting '
            });
        }
        
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
        
    }
    
}