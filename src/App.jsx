import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormularioProducto from './components/ProductForm'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <FormularioProducto/>
      </div>
    
    </>
  )
}

export default App
