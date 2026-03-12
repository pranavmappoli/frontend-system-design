import React, { useState } from 'react'

function FileExplorar({file}) {
    const [fileData,setFileData]=useState(file)

    function deleteFile(file,id){
        const newChildrens=file?.childrens?.filter((item)=>item.id!==id)
        setFileData((prev)=>{return {...prev,childrens:newChildrens}})
    }

  return (
    <div>
        <div>{fileData.name}</div>
        {fileData.childrens?.map((file)=> <div className='ml-6'> <FileExplorar  /> 
        <button onClick={()=>deleteFile(fileData,file.id)}>Delete</button>
        </div>)}
    </div>
  )
}

export default FileExplorar