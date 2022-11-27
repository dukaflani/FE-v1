import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? ' ');
        const access = cookies.access ?? false

        const linksDetails = {
            "streaming_links": req.body.streaming_links,
            "streaming_service": req.body.streaming_service,
            "link": req.body.link,
            "logo": req.body.logo,
        }

        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });

        }

        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/streaming-link/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `JWT ${access}`
                },
                json: true,
                body: JSON.stringify(linksDetails)
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
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
        
    }
    
}