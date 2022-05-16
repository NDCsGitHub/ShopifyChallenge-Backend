import React, { useContext, useState} from 'react'


const DashboardContext = React.createContext()


export const useDashboardContext = () => {
    return useContext(DashboardContext)
}



const DashboardContextProvider = ({children}) => {
  
  // state for opening and closing of side menus
  const [open, setOpen] = useState(true);

  //state for toggling sidemenu top
  const [sidemenuState, setSidemenuState] = useState('All Items');
  const handleSidemenuState = (text) =>{
    setSidemenuState(text)
  }




  return (
    <DashboardContext.Provider
        value={{
          open,
          setOpen,
          sidemenuState,
          handleSidemenuState,
        }}
    >
        {children}
    </DashboardContext.Provider>
  )
}

export { DashboardContextProvider }