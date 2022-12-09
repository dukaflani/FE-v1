import cookie from 'cookie';
import FormData from 'form-data'

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? ' ');
        const access = cookies.access ?? false

        const skizaTuneId = req.body.skizaTune_id

        const editSkizaTuneInfo = new FormData()
        editSkizaTuneInfo.append("country", req.body.country)
        editSkizaTuneInfo.append("carrier", req.body.carrier)
        editSkizaTuneInfo.append("code", req.body.code)
        editSkizaTuneInfo.append("sms", req.body.sms)
        editSkizaTuneInfo.append("ussd", req.body.ussd)

        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });

        }

        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/skiza-tune/${skizaTuneId}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `JWT ${access}`
                },
                body: editSkizaTuneInfo
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