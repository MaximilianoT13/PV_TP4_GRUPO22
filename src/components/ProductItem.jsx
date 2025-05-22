
const ProductosItems=({producto,eliminar,editar})=>{


return(

    <p>
    <li>
    Descripcion: {producto.descripcion} | Precio: ${producto.precio} | Descuento: %{producto.descuento} | Precio Final: ${producto.precioDesc} | Stock: {producto.stock}
    <button onClick={()=>editar(producto)}>Modificar</button>
    <button onClick={()=>eliminar(producto.id)}>Eliminar</button>
    </li>
    </p>
   
)

}

export default ProductosItems