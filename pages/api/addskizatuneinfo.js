import cookie from 'cookie';
import FormData from 'form-data'

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? ' ');
        const access = cookies.access ?? false



        const skizaTuneInfo = new FormData()
        skizaTuneInfo.append("country", req.body.country)
        skizaTuneInfo.append("carrier", req.body.carrier)
        skizaTuneInfo.append("sms", req.body.sms)
        skizaTuneInfo.append("code", req.body.code)
        skizaTuneInfo.append("ussd", req.body.ussd)
        skizaTuneInfo.append("skiza_tune", req.body.skiza_tune)

        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });

        }

        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/skiza-tune/`, {
                method: 'POST',
                headers: {
                    'Authorization': `JWT ${access}`
                },
                body: skizaTuneInfo
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