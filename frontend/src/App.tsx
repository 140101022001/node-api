import { Route, Routes } from "react-router-dom";
import CheckLogin from './middlleware/CheckLogin';
import Home from './pages/Home';
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile";

function App() {

  return (
    <Routes>
      <Route path='/' element={<CheckLogin checkVal={true}/>}>
        <Route index element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
      </Route>

      <Route path='/auth' element={<CheckLogin checkVal={false} />}>
        <Route index element={<Auth/>} />
      </Route>

      <Route path='*' element={'Not Found'} />
    </Routes>
  )
}

export default App
