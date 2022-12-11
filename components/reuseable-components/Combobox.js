import React, { useState } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'

const Combobox = ({ setPrimaryState, placeholderText, data, title, helperText, helperTextLink, onHelperTextLinkClick, mandatory }) => {
    const [filteredData, setFilteredData] = useState([])
    const [searchPhrase, setSearchPhrase] = useState('')
    const [searcWord2, setSearcWord2] = useState(null)

    const handleFilter = (e) => {
        const searchWord = e.target.value
        setSearcWord2(searchWord)
        setSearchPhrase(searchWord)
        const newFilter = data?.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord == "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }
    
    const clearInput = () => {
        setPrimaryState('')
        setFilteredData([]);
        setSearchPhrase('');
        setSearcWord2(null)

    }


  return (
        <div>
            <div className="text-sm font-medium tracking-tight text-gray-800 px-1">{title}{mandatory && " *"}</div>
            <div className='flex items-center justify-between border pr-1 bg-gray-100 '>
                <input 
                    className='flex-1 mr-2 border-transparent focus:ring-transparent focus:border-gray-100 text-gray-700 bg-gray-100' 
                    type='text' 
                    value={searchPhrase}
                    placeholder={placeholderText}
                    onChange={handleFilter}
                />
                <div>{!searcWord2 ? 
                    <MagnifyingGlassIcon className='h-4 w-4 text-gray-500'/> 
                    : 
                    <XMarkIcon className='h-4 w-4 text-gray-500 cursor-pointer' onClick={clearInput}/>}
                </div>
            </div>
            <div className="px-2 text-xs text-gray-400 mt-1">{helperText}<span onClick={onHelperTextLinkClick} className='text-blue-700 font-medium cursor-pointer'>{` ${helperTextLink}`}</span></div>
            {filteredData?.length != 0 && 
            <div className='mt-2 bg-white h-64 absolute w-64 overflow-hidden overflow-y-auto border scrollbar-thin scrollbar-track-white scrollbar-thumb-white'>
                {filteredData?.slice(0, 15)?.map((item, i) => (
                    <div 
                        className='px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer text-gray-700' 
                        key={i} 
                        onClick={() => {
                            setSearchPhrase(item.title);
                            setPrimaryState(item.id)
                            setFilteredData([]);
                        }}
                    >
                    {item.title}
                    </div>
                ))}
            </div>
            }
        </div>
  )
}

export default Combobox