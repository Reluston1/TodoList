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
            else return <BreadcrumbItem tag="a" onClick={_=>{actions.breadcrumbsClickHandler(TodoAppStruct.cDL()[index])}} href="#">{title}</BreadcrumbItem>
          }
        )
    )
  }

  return(
      <div classNam='breadcrumbs' >
          {
            !TodoAppStruct.directoryNamesArray() ? 
              <BreadcrumbItem active tag="span" href="#">Life</BreadcrumbItem>
            :
              <BreadcrumbItem tag="a" href="#" onClick={_=>actions.breadcrumbsClickHandler(null)}>Life</BreadcrumbItem>
          }
          {breadCrumbGenerator()}
      </div>
  )
}