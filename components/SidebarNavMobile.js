import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from "react-sidebar"
import { togglesideNavOpen } from '../redux/features/navigation/navigationSlice'
import SidebarContent from './SidebarContent'

const SidebarNavMobile = ({ children }) => {
  const { sideNavOpen } = useSelector((state) => state.navigation)
  const dispatch = useDispatch()

  return (
    <Sidebar
        sidebar={<SidebarContent/>}
        open={sideNavOpen}
        onSetOpen={() => dispatch(togglesideNavOpen())}
        styles={{ sidebar: { background: "white", zIndex:'9999999', width:'270px' }, overlay:{zIndex:'99999'} }}
    >{ children }</Sidebar>
  )
}

export default SidebarNavMobile