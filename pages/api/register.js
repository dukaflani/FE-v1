export default async (req, res) => {
    if (req.method === 'POST') {
        

        const accountRegistrationData = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role: req.body.role,
            stage_name: req.body.stage_name,
            is_verified: req.body.is_verified,
        }


        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(accountRegistrationData)
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