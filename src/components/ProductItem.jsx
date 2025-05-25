const ProductosItems=({producto,eliminar,editar})=>{


return(
      <tr>
        <td>{producto.id}</td>
        <td>{producto.descripcion}</td>
        <td>${parseFloat(producto.precioUnitario).toFixed(2)}</td>
        <td>{producto.descuento}%</td>
        <td>${producto.precioConDescuento.toFixed(2)}</td>
        <td>{producto.stock}</td>
        <td><button className="boton-editar" onClick={()=>editar(producto)}>Modificar</button>
        <button className="boton-eliminar" onClick={()=>eliminar(producto.id)}>Eliminar</button></td>
 
      </tr>
)
}

export default ProductosItems