
const InputBusqueda=({query,setQuery})=>{

return(
   <>
   <label htmlFor="buscar">Buscar: </label>
   <input id="buscar" value={query} onChange={(e)=>setQuery(e.target.value)}></input>
   </>
)
}
export default InputBusqueda