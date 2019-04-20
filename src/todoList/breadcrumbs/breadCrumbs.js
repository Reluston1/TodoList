import React from 'react'
import {Breadcrumb,BreadcrumbItem, InputGroupAddon} from 'reactstrap'

export const BreadCrumbs = ({TodoAppStruct}) => {
  debugger;
  const breadCrumbGenerator = () => {
    return( TodoAppStruct.directoryNamesArray() && TodoAppStruct.directoryNamesArray().map((title,index,array)=>{
      if( index === array.length - 1 ){
        return <BreadcrumbItem active tag="span" href="#">{title}</BreadcrumbItem>
      }
      else{
        return <BreadcrumbItem tag="a" href="#">{title}</BreadcrumbItem>
      }
    }))
   
  }
    
  
  console.log("directories",TodoAppStruct.directoryNamesArray())
  return(
    <div className='levelsUI' style={{ display:'flex', flexDirection:'row' }}>
      <Breadcrumb tag="nav" listTag="div" style={{flex:'11', padding: '5px'}}>
          {
            !TodoAppStruct.directoryNamesArray() ? 
              <BreadcrumbItem active tag="span" href="#">Life</BreadcrumbItem>
            :
              <BreadcrumbItem tag="a" href="#">Life</BreadcrumbItem>
          }
          {breadCrumbGenerator()}
      </Breadcrumb>
    </div>
  )
}