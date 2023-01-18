import { Fragment, useState } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import { Transition, Dialog } from '@headlessui/react'
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/solid'
import numeral from 'numeral';
import Link from 'next/link';
import poster from '../public/media/dukaflani-poster-default.png'
import { useDeleteProductMutation } from '../redux/features/videos/videosApiSlice';
import { useSelector } from 'react-redux';


const MyProductsMobile = ({ product }) => {
    const router = useRouter()
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id
    const productOwner = product?.user
    let [isOpen, setIsOpen] = useState(false)
    const [optionsModalOpen, setOptionsModalOpen] = useState(false)
    const [deleteProductError, setDeleteProductError] = useState(null)

    const deleteProductInfo = {
      "product_id": product?.id,
  } 


    const [ deleteProduct ] = useDeleteProductMutation()

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

    function closeOptionsModal() {
      setOptionsModalOpen(false)
      }

    function closeOptionsModalOpenDelete() {
      setOptionsModalOpen(false)
      openModal() 
      }
    
      function openOptionsModal() {
        setOptionsModalOpen(true)
      }


    const localPrice = product?.local_price
    let formattedLocalPrice = numeral(localPrice).format('0,0')


    const handleDeleteProduct = async () => {
      try {
          await deleteProduct(deleteProductInfo)
          setIsOpen(false)
      } catch (error) {
        setDeleteProductError(error)
          setTimeout(() => {
            setDeleteProductError(null)
          }, 5000);
      }
    }




  return (
    <>
     <article  className='h-64 md:h-28 landscape:h-28 cursor-pointer md:flex landscape:flex md:w-10/12 landscape:w-10/12 md:mx-auto landscape:mx-auto md:mb-4 landscape:mb-4'>
      <div className='h-4/6 md:h-full landscape:h-full md:w-4/12 landscape:w-4/12 relative md:rounded-md landscape:rounded-md bg-gray-200'>
          {product?.image && <Image
              src={!product?.image ? poster : product?.image}
              layout="fill"
              objectFit='fit'
              className='md:rounded-md landscape:rounded-md'
              />}
      </div>
      { product?.is_global ? (
            <div className='text-xs py-1 px-2 uppercase tracking-wide bg-blue-500 text-white font-semibold md:hidden landscape:hidden'>
                <div className='line-clamp-1'>Global Product</div>
            </div>
            ) : (
              <div className='text-xs py-1 px-2 uppercase tracking-wide bg-gray-300 text-gray-800 font-semibold md:hidden landscape:hidden'>
                <div className='line-clamp-1'>Simple Product</div>
            </div>
            )}
      <div className='h-2/6 flex space-x-1 pt-2 px-2 md:w-8/12 landscape:w-8/12 md:flex-col landscape:flex-col'>
        <div className='flex-1 pl-2'>
            <div className='flex items-center justify-between px-2 font-semibold text-base leading-4 text-gray-800'>
                <p className='line-clamp-1'>{product?.title}</p>
                <div onClick={openOptionsModal}>
                  <EllipsisVerticalIcon className='h-5 w-5'/>
                </div>
            </div>
            <div className='flex items-start justify-start px-2 tracking-tight text-base text-gray-800'>
                <p className='flex items-start justify-start'>{product?.local_currency}{formattedLocalPrice}</p>
            </div>
            { product?.is_global ? (
            <div className=' text-xs py-1 px-2 uppercase tracking-wide bg-blue-500 text-white font-semibold hidden md:block landscape:block'>
                <div className='line-clamp-1'>Global Product</div>
            </div>
            ) : (
              <div className=' text-xs py-1 px-2 uppercase tracking-wide bg-gray-300 text-gray-800 font-semibold hidden md:block landscape:block'>
                <div className='line-clamp-1'>Simple Product</div>
            </div>
            )}
        </div>
      </div>
     </article>

        {/* Options Modal */}
        <Transition appear show={optionsModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeOptionsModal}>
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
                  <div className='flex items-center justify-between'>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                    Product Options
                    </Dialog.Title>
                    <div onClick={closeOptionsModal}>
                      <XMarkIcon className='h-4 w-4'/>
                    </div>
                  </div>
                  <div className="mt-5 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeOptionsModalOpenDelete}
                    >
                      Delete
                    </button>
                    {currentUser == productOwner && <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => router.push({pathname: `/dashboard/edit/product/${product?.id}`})} 
                    >
                      Edit
                    </button>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Modal */}
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
                    Delete Product?
                  </Dialog.Title>
                  <div className="mt-2">
                    {currentUser == productOwner ? <p className="text-sm text-gray-500">
                        You're about to delete <strong>{product?.title}</strong>. This action
                        is irreversible and you won't be able to see this product again.
                    </p>
                    :
                    <p className="text-sm text-gray-500">
                        You're not authorized to delete this product
                    </p>}
                  </div>

                  <div className="mt-5 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {currentUser == productOwner && <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDeleteProduct}
                    >
                      Yes, Delete!
                    </button>}
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

export default MyProductsMobile