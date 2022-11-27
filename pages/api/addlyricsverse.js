import cookie from 'cookie';
import FormData from 'form-data'

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? ' ');
        const access = cookies.access ?? false

        console.log("type from api", req.body.type)
        console.log("artist from api", req.body.artist)
        console.log("body from api", req.body.body)
        console.log("lyrics from api", req.body.lyrics)

        const lyricsVerseInfo = new FormData()
        lyricsVerseInfo.append("type", req.body.type)
        lyricsVerseInfo.append("artist", req.body.artist)
        lyricsVerseInfo.append("body", req.body.body)
        lyricsVerseInfo.append("lyrics", req.body.lyrics)

        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });

        }

        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/lyrics-verse/`, {
                method: 'POST',
                headers: {
                    'Authorization': `JWT ${access}`
                },
                body: lyricsVerseInfo
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