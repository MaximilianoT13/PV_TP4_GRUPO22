import { useCallback, useState } from "react"

import ProductosItems from "./ProductItem"

const ListaProductos=({productos,eliminar,editar})=>{

return(

       <>
      {productos.map((producto)=>(
        <ProductosItems key={producto.id} producto={producto} eliminar={eliminar} editar={editar}/>
      ))}
      </>
)




}

export default ListaProductos