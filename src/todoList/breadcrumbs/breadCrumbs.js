import React from 'react'
import {Breadcrumb,BreadcrumbItem} from 'reactstrap'

export const BreadCrumbs = ({TodoAppStruct,actions}) => {

  const breadCrumbGenerator = () => {
    return( 
      TodoAppStruct.directoryNamesArray() &&
        TodoAppStruct.directoryNamesArray()
        .map(
          (title,index,array)=>{
            if( index === array.length - 1 ) return <BreadcrumbItem active tag="span" href="#">{title}</BreadcrumbItem>
            else return <BreadcrumbItem tag="a" onClick={_=>{actions.focusUpdater(TodoAppStruct.cDL()[index])}} href="#">{title}</BreadcrumbItem>
          }
        )
    )
  }

  return(
    <div className='levelsUI' style={{ display:'flex', flexDirection:'row' }}>
      <Breadcrumb tag="nav" listTag="div" style={{flex:'11', padding: '5px'}}>
          {
            !TodoAppStruct.directoryNamesArray() ? 
              <BreadcrumbItem active tag="span" href="#">Life</BreadcrumbItem>
            :
              <BreadcrumbItem tag="a" href="#" onClick={_=>actions.focusUpdater(null)}>Life</BreadcrumbItem>
          }
          {breadCrumbGenerator()}
      </Breadcrumb>
    </div>
  )
}