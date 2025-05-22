import { useState, useCallback,useEffect } from 'react'
import './App.css'
import FormularioProducto from './components/ProductForm'
import ListaProductos from './components/ProductList'
import ProductosItems from './components/ProductItem'


function App() {

const [productos,setProductos]=useState([])
const [modEdicion,setEdicion]=useState(null)

useEffect(()=>{
  console.log(productos);
},[productos])


const guardar= useCallback ((producto)=>{
    if(modEdicion){
       setProductos((prev)=>
        prev.map((prod)=> (modEdicion.id === prod.id ? producto : prod)))
       setEdicion(null);
    }
    else 
    {
        setProductos((prev) => [...prev, producto]);
    }
},[modEdicion])

const editar= useCallback ((producto) =>{
    console.log(`editando producto(ID): ${producto.id}`)
    setEdicion(producto);
},[])

const eliminar= useCallback ((id) =>{
  
   setProductos(prev=>prev.filter(prod => prod.id !==id));

},[]) 



  return (
    <>

    <div>
        <FormularioProducto guardar={guardar} prodEdit={modEdicion}/>
        <ListaProductos productos={productos} eliminar={eliminar} editar={editar}/>
    </div>

    
    </>
  )
}

export default App
