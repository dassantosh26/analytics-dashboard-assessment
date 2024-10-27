import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/AppSidebar'
import Home from './components/Home'
import Datasets from './components/Datasets'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/datasets' element={<Datasets/>}/>
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
