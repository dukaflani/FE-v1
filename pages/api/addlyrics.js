import cookie from 'cookie';
import FormData from 'form-data'

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? ' ');
        const access = cookies.access ?? false

        const lyricsInfo = new FormData()
        lyricsInfo.append("title", req.body.title)
        lyricsInfo.append("vocals", req.body.vocals)
        lyricsInfo.append("bgvs", req.body.bgvs)
        lyricsInfo.append("audio", req.body.audio)
        lyricsInfo.append("director", req.body.director)
        lyricsInfo.append("writer", req.body.writer)
        lyricsInfo.append("instruments", req.body.instruments)
        lyricsInfo.append("producer", req.body.producer)
        lyricsInfo.append("slug", req.body.slug)

        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });

        }

        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/lyrics/`, {
                method: 'POST',
                headers: {
                    'Authorization': `JWT ${access}`
                },
                body: lyricsInfo
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
                error: 'Something went wrong when getting your data'
            });
        }
        
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
        
    }
    
}