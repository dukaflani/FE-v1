import React, { useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Transition, Dialog } from '@headlessui/react'
import slugify from 'slugify'
import FormData from 'form-data'
import { currSymbols } from '../data/currencies'
import { useFetchAccessTokenQuery, useFetchProductQuery } from '../redux/features/videos/videosApiSlice'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'
import InputField from './reuseable-components/InputField'
import SelectInputFieldWithKeysLocal from './reuseable-components/SelectInputFieldWithKeysLocal'
import TextAreaField from './reuseable-components/TextAreaField'

const EditProduct = () => {
  const router = useRouter()
  const { productid } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [productTitle, setProductTitle] = useState("")
  const [currencySymbol, setCurrencySymbol] = useState("")
  const [localPrice, setLocalPrice] = useState("")
  const [dollarPrice, setDollarPrice] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [vendor, setVendor] = useState("")
  const [prodDesc, setProdDesc] = useState("")
  const [prodImage, setProdImage] = useState('')
  const { data: accessToken } = useFetchAccessTokenQuery()
  const [editedProduct, setEditedProduct] = useState(null)
  const [editErrors, setEditErrors] = useState(null)
  const slugString = !productTitle ? '' : productTitle
  const prodSlug = slugify(slugString, {lower: true})

    const queryParams = {
      product_id: productid,
      }


    const { data: product } = useFetchProductQuery(queryParams)


    function closeModal() {
        setIsOpen(false)
      }
    
    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
      setProductTitle(product?.data?.title)
      setCurrencySymbol(product?.data?.local_currency)
      setLocalPrice(product?.data?.local_price)
      setDollarPrice(product?.data?.dollar_price)
      setWhatsapp(product?.data?.whatsapp)
      setVendor(product?.data?.sold_by)
      setProdDesc(product?.data?.description)
    }, [product?.data])


    const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

      const editProductInfo = new FormData();
      editProductInfo.append("title", productTitle);
      editProductInfo.append("image", prodImage);
      editProductInfo.append("description", prodDesc);
      editProductInfo.append("local_currency", currencySymbol);
      editProductInfo.append("local_price", localPrice);
      editProductInfo.append("dollar_price", dollarPrice);
      editProductInfo.append("whatsapp", whatsapp);
      editProductInfo.append("sold_by", vendor);
      editProductInfo.append("slug", prodSlug);


      const handleEditProduct = () => {
        setEditing(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/products/${productid}/`,
        {
            method: 'PATCH',
            headers: myHeaders,
            body: editProductInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
          setEditing(false)
          router.push("/dashboard/products")
          setEditedProduct(result)
        })
        .catch((error) => {
          setEditing(false)
          setEditErrors(error)
        });
    }



  return (
    <>
        <div>
        <h1 className='uppercase tracking-tight font-extrabold text-lg text-gray-800'>Edit Product</h1>
            <div className='p-1'>
                <InputField 
                    primaryState={productTitle} 
                    setPrimaryState={setProductTitle}
                    // mandatory={true}
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
                        // mandatory={true}
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
                        // mandatory={true}
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
                        // mandatory={true}
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
                        // mandatory={true}
                        // placeholderText='$0.00'
                        title="WhatsApp"
                        helperText="Follow the WhatsApp phone number guide"
                        helperTextLink="here"
                        onHelperTextLinkClick={openModal}
                    />
                </div>
                <div className='w-6/12'>
                    <InputField 
                        primaryState={vendor} 
                        setPrimaryState={setVendor}
                        // mandatory={true}
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
                    // mandatory={true}
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
                    <ApiButtonWithSpinner
                        title='Cancel'
                        bgColor="bg-red-600"
                        hoverColor="hover:bg-red-500"
                        textColor="text-white"
                        onClick={() => router.push("/dashboard/products")}
                    />
                    <ApiButtonWithSpinner
                        title='Edit'
                        loading={editing}
                        bgColor="bg-blue-500"
                        hoverColor="hover:bg-blue-400"
                        textColor="text-white"
                        onClick={handleEditProduct}
                    />
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

export default EditProduct