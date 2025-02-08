const form =document.getElementById("form")
const name=document.getElementById("name")
const email=document.getElementById("email")
const age=document.getElementById("age")
const table=document.getElementById("tbody")
const nameColumn=document.getElementById("nameColumn")
const emailColumn=document.getElementById("emailColumn")
const ageColumn=document.getElementById("ageColumn")

let state={data:[]}

const setState=(newData)=>{
    state.data=newData
    render()
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
   const user={name:name.value,email:email.value,age:Number(age.value),id:String(Date.now())}
   setState([...state.data,user])
})

function deleteHandler(e){
const itemId=e.target.dataset.id
const filteredData=state.data.filter((item)=>item.id!==itemId)
setState(filteredData)
}
function attachDeleteHanlder(deleteButton){
    deleteButton.addEventListener('click',deleteHandler)
}

function sortHanlder(e){
    const field=e.target.textContent
    console.log(field)
    const sorted=[...state.data].sort((a,b)=>{
        if(field==='age') return a.age - b.age
        console.log(field,a[field],b[field],"pranav",a[field].length > b[field].length ? 1 : -1)
        return a[field] > b[field] ? 1 : -1

    })
    console.log(sorted)
    setState(sorted)
}


(()=>{
    nameColumn.addEventListener('click',sortHanlder)
    ageColumn.addEventListener('click',sortHanlder)
    emailColumn.addEventListener('click',sortHanlder)
})()

function render(){
    table.innerHTML=''
    console.log
    state.data.forEach((item)=>{
        const tr=document.createElement('tr')
        const deleteBtn=document.createElement('button')
        const tdName=document.createElement('td')
        const tdEmail=document.createElement('td')
        const tdAge=document.createElement('td')
        const tdButton=document.createElement('td')

        tdButton.appendChild(deleteBtn)
        tdName.textContent=item.name
        tdAge.textContent=item.age
        tdEmail.textContent=item.email
        tr.appendChild(tdName)
        tr.appendChild(tdEmail)
        tr.appendChild(tdAge)
        tr.appendChild(tdButton)

        
        deleteBtn.dataset.id=item.id
        deleteBtn.textContent='Delete'
        attachDeleteHanlder(deleteBtn)
        
        
        
        table.appendChild(tr)
        
    })
}