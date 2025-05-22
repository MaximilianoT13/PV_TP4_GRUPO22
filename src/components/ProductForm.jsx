import { useState,useEffect } from "react";

const FormularioProducto=({guardar,prodEdit})=>{
const [pid,setPid]=useState(1);

const [error,setError]=useState({
     descripcionErr: "",
     precioErr: "",
     stockErr: ""
});
const aux={
    id: "",
    descripcion: "",
    precio: "",
    descuento: 0,
    stock: "",
    precioDesc: 0,
};

const [producto,setProducto]=useState(aux)


useEffect(()=>{
  const precio = parseFloat(producto.precio);

  if(!isNaN(precio))
  {
    if(producto.descuento===0)
       setProducto((prev)=>({...prev,precioDesc: precio}));
    else
       setProducto((prev)=>({...prev,precioDesc: (precio * (1 - producto.descuento/100)).toFixed(2)}));
  } 
  else 
    setProducto((prev)=>({...prev,precioDesc: ""}));

},[producto.precio,producto.descuento]);

const verificarValor=()=>{
     let ok = true
     const stock= Number(producto.stock);
     const errores={precioErr: "", descripcionErr: "", stockErr: ""}

//validar PRECIO
    if(producto.precio.trim()==="")
    {
        errores.precioErr= "Este campo no puede estar vacio"
        ok=false
        
    }
    else if(isNaN(producto.precio)){
        errores.precioErr="Debe colocar valores numericos"
        ok=false
    }
//validar DESCRIPCION
    if(producto.descripcion.trim()==="")
    {
        errores.descripcionErr = "Debe colocar el nombre del producto"
        ok=false
    }

    if(producto.stock.trim()==="") {
        errores.stockErr = "El campo no puede estar vacio"
        ok=false
    }
    else if(!Number.isInteger(stock) || stock<=0){
        errores.stockErr = "Debe ingresar un numero entero mayor a 0"
        ok=false
    }
    setError(errores)
    return ok;
};

useEffect(()=>{
    if(prodEdit)
        setProducto(prodEdit);
    else
        setProducto(aux);
},[prodEdit])

const guardarProducto=()=>{  


    if(verificarValor()){
        if(prodEdit){
            guardar(producto)
            
        }
        else{
              const nuevoProducto = { ...producto, id: pid };
      setPid(pid + 1); 
      guardar(nuevoProducto);
        }
        setProducto(aux)
 }
}

return(
<div>
   <label>Descripcion: <input value={producto.descripcion} onChange={(x)=>setProducto({...producto,descripcion: x.target.value})} ></input><br/></label>
   {error.descripcionErr !=="" && <p style={{color: "red"}}>{error.descripcionErr}</p>}

   <label>Precio: <input type="number" value={producto.precio} onChange={(x)=>setProducto({...producto,precio: x.target.value})}></input><br/></label>
   {error.precioErr !== "" && <p style={{ color: "red" }}>{error.precioErr}</p>}
   
  <label>Descuento: <select value={producto.descuento} onChange={(e) => setProducto({ ...producto, descuento: parseInt(e.target.value) })}>
  <option value="0">0%</option>
  <option value="10">10%</option>
  <option value="20">20%</option>
  <option value="30">30%</option>
  <option value="40">40%</option>
  <option value="50">50%</option>
  <option value="75">75%</option>
  </select>
  </label>  

    <p>Precio con Descuento: {producto.precioDesc}</p>

    <label>Stock:</label>
    <input type="number" min="1" step="1" value={producto.stock} onChange={(x)=>setProducto({...producto,stock: x.target.value})}></input> <br/>
    {error.stockErr !== "" && <p style={{color:"red"}}>{error.stockErr}</p>}

    { prodEdit ? (
    <button onClick={guardarProducto}>Editar</button>) 
    : (
    <button onClick={guardarProducto}>Guardar</button>
    )
     }

</div>
);

}

export default FormularioProducto