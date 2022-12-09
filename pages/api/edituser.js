import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? ' ');
        const access = cookies.access ?? false


        const editUserInfoData = { 
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            role: req.body.role,
            phone: req.body.phone,
            stage_name: req.body.stage_name,
            email: req.body.email,
        };



        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }

        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/me/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `JWT ${access}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editUserInfoData),
            });
            const data = await apiResponse.json();

            if (apiResponse.status === 200) {
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