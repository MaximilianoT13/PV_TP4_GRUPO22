import { useCallback, useState } from "react"

import ProductosItems from "./ProductItem"

const ListaProductos=({productos,eliminar,editar})=>{

return(

      <>
    {productos.length === 0 ? (
      <tr>
        <td colSpan={7} style={{ fontFamily: "sans-serif", fontWeight: "bold", textAlign: "center" }}>
          No hay datos disponibles
        </td>
      </tr>
       ):(
        
        productos.map((e)=>(<ProductosItems key={e.id} producto={e} eliminar={eliminar} editar={editar}/>))
       )
       }
      </>
)


}

export default ListaProductos
