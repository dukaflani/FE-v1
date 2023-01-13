import React, { useState, Fragment, useEffect } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { useSelector } from 'react-redux'
import slugify from 'slugify'
import { nanoid } from 'nanoid'
import { currSymbols } from '../data/currencies'
import { useFetchAccessTokenQuery } from '../redux/features/videos/videosApiSlice'
import InputField from './reuseable-components/InputField'
import SelectInputFieldWithKeysLocal from './reuseable-components/SelectInputFieldWithKeysLocal'
import TextAreaField from './reuseable-components/TextAreaField'


const ProductInfoInput = ({ setCurrentInput, currentInput }) => {
    const [isOpen, setIsOpen] = useState(false)
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
    const [nanoId, setNanoId] = useState('')
    const prodSlug = slugify(productTitle, {lower: true})

    useEffect(() => {
      setNanoId(nanoid(16))
  }, [])

    const { userProfile } = useSelector((state) => state.auth)
    const userProfileId = userProfile?.info ? userProfile?.info[0]?.id : 0


    function closeModal() {
        setIsOpen(false)
      }
    
    function openModal() {
        setIsOpen(true)
    }

    
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
      productInfo.append("customuserprofile", userProfileId);
      productInfo.append("url_id", nanoId);

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
    <>
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
            <div className='p-1 flex flex-col'>
                <div className='w-full'>
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
                <div className='w-full'>
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
                <div className='w-full'>
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
            <div className='p-1 flex flex-col'>
                <div className='w-full'>
                    <InputField 
                        primaryState={whatsapp} 
                        setPrimaryState={setWhatsapp}
                        mandatory={true}
                        // placeholderText='$0.00'
                        title="WhatsApp"
                        helperText="Follow the WhatsApp phone number guide"
                        helperTextLink="here"
                        onHelperTextLinkClick={openModal}
                    />
                </div>
                <div className='w-full'>
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

        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    WhatsApp Phone Number Guide
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Example country: <strong>Kenya</strong> <br/>
                        Country code: +254 <br/>
                        Int. format: +254722000000 <br/>
                        Don't use: +254-(072)-2000000 <br/>
                        Don't use: +254722000000 <br/>
                        Don't use: 0722000000 <br/>
                        Use: 254722000000 (int. format without preceding "+")
                    </p>
                  </div>

                  <div className="mt-5 space-x-2">
                    <button
                      style={{backgroundColor:'#25D366'}}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ProductInfoInput