import { useState, useCallback,useEffect,useMemo } from 'react'
import './App.css'
import FormularioProducto from './components/ProductForm'
import ListaProductos from './components/ProductList'
import InputBusqueda from './components/SearchBar'


function App() {

const [productos,setProductos]=useState([])
const [modoEdicion,setEdicion]=useState(null)
const [query,setQuery]=useState("")

useEffect(()=>{
  console.log(productos);
},[productos])


const guardar= useCallback ((producto)=>{
    if(modoEdicion){
       setProductos((prev)=>
        prev.map((prod)=> (modoEdicion.id === prod.id ? producto : prod)))
       setEdicion(null); 
    }
    else 
    {
        setProductos((prev) => [...prev, producto]);
    }
},[modoEdicion])

const editar= useCallback ((producto) =>{
    console.log(`editando producto(ID): ${producto.id}`)
    setEdicion(producto);
},[])

const eliminar= useCallback ((id) =>{
  
   setProductos(prev=>prev.filter(prod => prod.id !==id));

},[]) 



const encontrado = useMemo(()=>{
    const p = query.toLowerCase().trim();
    if(!p)
        return productos
    else
        return productos.filter((x)=>x.descripcion.toLowerCase().startsWith(p) || x.id.toString().startsWith(p) )
},[query, productos])

  return (
    <div className="formulario">
       {modoEdicion === null ?(
        <h2>REGISTRAR PRODUCTO</h2>
       ):(<h2>EDITAR PRODUCTO</h2>)}
       <section className="registro">
        <FormularioProducto guardar={guardar} prodEdit={modoEdicion}/>
        <InputBusqueda query={query} setQuery={setQuery}/>
        </section>

        <section className="lista">
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DESCRIPCION</th>
            <th>PRECIO UNITARIO</th>
            <th>DESCUENTO</th>
            <th>PRECIO CON DESCUENTO</th>
            <th>STOCK</th>
            <th>ACCIONES</th>
          </tr>      
        </thead>
        <tbody>
        <ListaProductos productos={query.trim() ? encontrado : productos} eliminar={eliminar} editar={editar}/>
        </tbody>
        </table>
        </section>
    </div>
  )
}

export default App
