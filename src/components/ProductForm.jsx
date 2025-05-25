import { useState,useEffect } from "react";

const FormularioProducto=({guardar,prodEdit})=>{
const [pid,setPid]=useState(1);

const [error,setError]=useState({
     descripcionError: "",
     precioError: "",
     stockError: ""
});

const aux={
    id: "",
    descripcion: "",
    precioUnitario: 0,
    descuento: 0,
    stock: "",
    precioConDescuento: 0,
};

const [producto,setProducto]=useState(aux)


useEffect(()=>{
  const precio = parseFloat(producto.precioUnitario);
 
  if(!isNaN(precio))
  {
    if(producto.descuento===0)
        setProducto((prev)=>({...prev,precioConDescuento: precio}));
    else
        setProducto((prev)=>({...prev,precioConDescuento: parseFloat((precio * (1 - producto.descuento/100)).toFixed(2))}));
  } 
  else 
    setProducto((prev)=>({...prev,precioConDescuento: ""}));

},[producto.precioUnitario,producto.descuento]);

const verificarValor=()=>{
     let ok = true
     const stock= Number(producto.stock);
     const vacio={precioError: "", descripcionError: "", stockError: ""}
//validar PRECIO UNITARIO
    if (!producto.precioUnitario || producto.precioUnitario <= 0) {
        vacio.precioError = "El precio debe ser mayor que 0";
        ok = false;
    }
//validar STOCK
    if (!stock || stock < 1 || !Number.isInteger(stock)) {
        vacio.stockError = "El stock debe ser un número entero mayor que 0";
        ok = false;
    }
//validar DESCRIPCION
    if(producto.descripcion.trim()==="")
    {
        vacio.descripcionError = "Este campo no puede estar vacio"
        ok=false
    }

    setError(vacio)
    return ok;
};

useEffect(()=>{
    if(prodEdit)
        setProducto(prodEdit);
    else
        setProducto(aux);
    setError({
       descripcionError: "",
       precioError: "",
       stockError: ""
    })
},[prodEdit])


const handleChange=(e)=>{
   const { name, value} = e.target;
   setProducto(prev=>({...prev, [name]: name === "descuento" ? parseInt(value) : value}))
}

const guardarProducto=(e)=>{  
    e.preventDefault()
    if(verificarValor()){
        if(prodEdit){
            guardar(producto)
            setProducto(aux);
        }
        else{
            const nuevoProducto = { ...producto, id: pid };
            setPid(pid + 1); 
            guardar(nuevoProducto);
            setProducto(aux)
        }

 }
}

return(

<form onSubmit={guardarProducto}>
   <label htmlFor="descripcion">Descripcion: </label>
   <input id="descripcion" name="descripcion" value={producto.descripcion} onChange={handleChange}></input><br/>
   {error.descripcionError !=="" && <p style={{color: "red"}}>{error.descripcionError}</p>}

   <label htmlFor="precio">Precio: </label>
   <input id="precio" min="1" name="precioUnitario" type="number" value={producto.precioUnitario} onChange={handleChange}></input><br/>
   {error.precioError !== "" && <p style={{ color: "red" }}>{error.precioError}</p>}
   
  <label htmlFor="descuento">Descuento:  </label>  
  <select id="descuento" name="descuento" value={producto.descuento} onChange={handleChange}>
    <option value="0">0%</option>
    <option value="10">10%</option>
    <option value="20">20%</option>
    <option value="30">30%</option>
    <option value="40">40%</option>
    <option value="50">50%</option>
    <option value="75">75%</option>
  </select>
  
  <p className="precio-descuento">Precio con Descuento: ${producto.precioConDescuento}</p>
   
  <label htmlFor="stock">Stock:</label>
    <input id="stock" name="stock" type="number" min="1" step="1" value={producto.stock} onChange={handleChange}></input><br/>
    {error.stockError !== "" && <p style={{color:"red", fontFamily: "arial"}}>{error.stockError}</p>}
   
    <button type="submit">
    { prodEdit ? "Editar" : "Guardar"}
    </button>

</form>

);

}

export default FormularioProducto