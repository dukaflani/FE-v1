import React, { useState } from 'react'
import slugify from 'slugify'
import { useFetchAccessTokenQuery } from '../redux/features/videos/videosApiSlice'
import InputField from './reuseable-components/InputField'
import SelectInputFieldWithKeysLocal from './reuseable-components/SelectInputFieldWithKeysLocal'
import TextAreaField from './reuseable-components/TextAreaField'


const ProductInfoInput = ({ setCurrentInput, currentInput }) => {
    const currSymbols = [
        {
            title: "Kenya Shilling",
            value: "Ksh.",
        },
        {
            title: "Uganda Shilling",
            value: "Ush.",
        },
        {
            title: "Tanzania Shilling",
            value: "Tzs.",
        },
        {
            title: "Rwanda Franc",
            value: "RWF.",
        },
        {
            title: "S. Africa Rand",
            value: "R.",
        },
        {
            title: "Nigeria Naira",
            value: "₦.",
        },
        {
            title: "Ghana Cede",
            value: "GH₵.",
        },
        {
            title: "S. Sudan Pound",
            value: "SDG.",
        },
    ]
    const [productTitle, setProductTitle] = useState("")
    const [currencySymbol, setCurrencySymbol] = useState("")
    const [localPrice, setLocalPrice] = useState("")
    const [dollarPrice, setDollarPrice] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [vendor, setVendor] = useState("")
    const [prodDesc, setProdDesc] = useState("")
    const [prodImage, setProdImage] = useState('')
    const { data: accessToken } = useFetchAccessTokenQuery()
    const [createdProduct, setCreatedProduct] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const prodSlug = slugify(productTitle, {lower: true})

    
    
    const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

      const productInfo = new FormData();
      productInfo.append("title", productTitle);
      productInfo.append("image", prodImage);
      productInfo.append("description", prodDesc);
      productInfo.append("local_currency", currencySymbol);
      productInfo.append("local_price", localPrice);
      productInfo.append("dollar_price", dollarPrice);
      productInfo.append("whatsapp", whatsapp);
      productInfo.append("sold_by", vendor);
      productInfo.append("slug", prodSlug);

      const handleAddProduct = () => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/products/`,
        {
            method: 'POST',
            headers: myHeaders,
            body: productInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            setCreatedProduct(result)
            setProductTitle(" ")
            setLocalPrice(" ")
            setDollarPrice(" ")
            setWhatsapp(" ")
            setVendor(" ")
            setProdDesc(" ")
            setProdImage(null)
        })
        .catch((error) => {
            setErrorMessage(error)
        });
    }
    

  return (
    <div className='p-2 bg-white shadow-md border-b mb-10'>
        <div className='p-1'>
            <InputField 
                primaryState={productTitle} 
                setPrimaryState={setProductTitle}
                mandatory={true}
                // placeholderText='Song title...'
                title="Product Title"
                // helperText="Name your links. Video title + 'Links' recommended"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 flex space-x-3'>
            <div className='w-4/12'>
            <SelectInputFieldWithKeysLocal
                    primaryState={currencySymbol}
                    setPrimaryState={setCurrencySymbol}
                    mandatory={true}
                    name='local-currency'
                    data={currSymbols}
                    selectTitle='Select a currency'
                    fieldTitle="Local Currency"
                    // helperText="helper"
                    // onHelperTextLinkClick={}
                    // helperTextLink="here"
                />
            </div>
            <div className='w-4/12'>
                <InputField 
                    primaryState={localPrice} 
                    setPrimaryState={setLocalPrice}
                    mandatory={true}
                    placeholderText='0.00'
                    title="Local Price"
                    // helperText="Paste your streaming/download link here"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
            <div className='w-4/12'>
                <InputField 
                    primaryState={dollarPrice} 
                    mandatory={true}
                    setPrimaryState={setDollarPrice}
                    placeholderText='$0.00'
                    title="Price in USD"
                    helperText="Estimated price in U.S Dollars"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>
        <div className='p-1 flex space-x-3'>
            <div className='w-6/12'>
                <InputField 
                    primaryState={whatsapp} 
                    setPrimaryState={setWhatsapp}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="WhatsApp"
                    helperText="Follow the WhatsApp phone number guide"
                    helperTextLink="here"
                    onHelperTextLinkClick={() => window.open("https://faq.whatsapp.com/5913398998672934/?helpref=search&query=click%20to%20chat&search_session_id=7bd93c3b4b282317258bc838749e1151&sr=0")}
                />
            </div>
            <div className='w-6/12'>
                <InputField 
                    primaryState={vendor} 
                    setPrimaryState={setVendor}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="Vendor"
                    helperText="Name of the seller"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>
        <div className='p-1'>
            <TextAreaField
                primaryState={prodDesc} 
                setPrimaryState={setProdDesc}
                mandatory={true}
                placeholderText='Tell us something about your product...'
                title="Product Description"
                // helperText="helper"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1'>
            <input accept='image/*' onChange={(e) => setProdImage(e.target.files[0])} type="file"  className='w-full border-gray-300 focus:outline-none' />
            <div className='py-1 text-xs text-gray-400'>Upload product image max size 300KB</div>
        </div>
        <br/>
        <div className='flex items-center justify-between'>
            <div className='bg-red-600 hover:bg-red-400 text-white cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Cancel</div>
            <div onClick={handleAddProduct} className=' border border-gray-500 text-gray-500 hover:bg-gray-300 hover:border-gray-300 cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Add Product</div>
        </div>
    </div>
  )
}

export default ProductInfoInput