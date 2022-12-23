import cookie from 'cookie';
import FormData from 'form-data'

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? ' ');
        const access = cookies.access ?? false


        const productInfo = new FormData()
        productInfo.append("title", req.body.productTitle)
        productInfo.append("image", req.body.prodImage)
        productInfo.append("description", req.body.prodDesc)
        productInfo.append("local_currency", req.body.currencySymbol)
        productInfo.append("local_price", req.body.localPrice)
        productInfo.append("dollar_price", req.body.dollarPrice)
        productInfo.append("whatsapp", req.body.whatsapp)
        productInfo.append("sold_by", req.body.vendor)
        productInfo.append("slug", req.body.prodSlug)

        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });

        }

        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/products/`, {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    // 'Accept': 'multipart/form-data',
                    'content-type': 'multipart/form-data',
                    'Authorization': `JWT ${access}`
                },
                // json: true,
                // body: JSON.stringify(productInfo)
                body: productInfo
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