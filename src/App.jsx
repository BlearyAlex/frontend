import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProductsPage from "./pages/ProductsPage";
import ProductsFormPage from './pages/ProductsFormPage';
import ProtectedRoute from "./ProtectedRoute";
import { ProductsProvider } from "./context/ProductsContext";
import { UsersProvider } from './context/UserContext'
import UsersFormPage from "./pages/UsersFormPage";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import UsersPage from "./pages/UsersPage";
import LibrosPage from "./pages/LibrosPage";
import LibrosFormPage from "./pages/LibrosFormPage";
import { LibrosProvider } from "./context/LibrosContext";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <UsersProvider>
          <LibrosProvider>
            <BrowserRouter>
              <main className="container mx-auto px-10">
                <Navbar />
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />

                  {/*Seccion de rutas protegidas */}

                  <Route element={<ProtectedRoute />}>
                    <Route path='/profile' element={<ProfilePage />} />

                    <Route path='/products' element={<ProductsPage />} />
                    <Route path='/add-product' element={<ProductsFormPage />} />
                    <Route path='/products/:id' element={<ProductsFormPage />} />

                    <Route path='/users' element={<UsersPage />} />
                    <Route path="/add-user" element={<UsersFormPage />} />
                    <Route path="/users/:id" element={<UsersFormPage />} />

                    <Route path='/libros' element={<LibrosPage />} />
                    <Route path="/add-libro" element={<LibrosFormPage />} />
                    <Route path="/libros/:id" element={<LibrosFormPage />} />
                  </Route>

                  {/*Ruta para 404 Not Found y redireccion*/}
                  <Route path="*" element={<NotFound />} />

                </Routes>
              </main>
            </BrowserRouter>
          </LibrosProvider>
        </UsersProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App