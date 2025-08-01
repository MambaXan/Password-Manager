import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Login from "./Pages/Login/Login";
import Important from './Pages/Important/Important'
import Layout from "./Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route path={""} element={<Main />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"Important"} element={<Important />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
