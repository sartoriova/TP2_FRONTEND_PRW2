import "./App.css";
import axios from "axios";
import { useState, useEffect } from 'react';
import ProductsList from "./ProductsList";
import UsersList from "./UsersList";
import ProductRegister from "./ProductRegister";
import UserRegister from "./UserRegister";
import PurchaseRegister from "./PurchaseRegister";
import { ProductContext } from "./ProductContext";
import { UserContext } from "./UserContext";

function App() {
  const [users, setUsers] = useState([]);
  const [invalidName, setInvalidName] = useState("");

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(false);
  const [duplicateProduct, setDuplicateProduct] = useState(false);
  const [product, setProduct] = useState({
    nome: "",
    preco: "",
  });

  const [duplicatePurchase, setDuplicatePurchase] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:3000"
  });

  async function loadUsers() {
    try {
      let res = await api.get("/usuarios");
      setUsers(res.data);
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function loadProducts() {
    try {
      let res = await api.get("/produtos");
      setProducts(res.data);
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  useEffect(() => {
    loadUsers();
    loadProducts();
  }, []);

  async function registerUser(newUser) {
    try {
      await api.post("/usuarios", newUser);
      await loadUsers();

      if (invalidName) {
        setInvalidName(false);
      }
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);

        if (error.response.status == 400) {
          setInvalidName(true);
          setErrorMessage(error.response.data.msg);
        }
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function removeUser(e) {
    try {
      await api.delete(`/usuarios/${e.target.id}`);
      await loadUsers();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  function calculateTotal(idUser) {
    let soma = 0;

    users.filter((user) => user.id == idUser)[0].produtos.forEach(product => {
      soma = soma + product.preco;
    });

    return soma;
  }

  async function registerProduct() {
    try {
      await api.post("/produtos", product);
      await loadProducts();
      await loadUsers();

      if (duplicateProduct) {
        setDuplicateProduct(false);
      }
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);

        if (error.response.status == 400) {
          setDuplicateProduct(true);
          setErrorMessage(error.response.data.msg);
        }
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function editProduct() {
    try {
      await api.put(`/produtos/${product.id}`, product);
      await loadProducts();
      await loadUsers();

      if (duplicateProduct) {
        setDuplicateProduct(false);
      }
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);

        if (error.response.status == 400) {
          setDuplicateProduct(true);
          setErrorMessage(error.response.data.msg);
        }
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function removeProduct(e) {
    try {
      await api.delete(`/produtos/${e.target.id}`);
      await loadProducts();
      await loadUsers();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function registerPurchase(newPurchase) {
    try {
      await api.post("/compras", newPurchase);
      await loadUsers();

      if (duplicatePurchase) {
        setDuplicatePurchase(false);
      }
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);

        if (error.response.status == 400) {
          setDuplicatePurchase(true);
          setErrorMessage(error.response.data.msg);
        }
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function removePurchaseUser(e) {
    try {
      await api.delete(`/compras/${e.target.parentElement.id}/${e.target.id}`);
      await loadUsers();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  return (
    <>
      <h1 className="p-3 text-center">Lista de compras por usuário</h1>
      <div className="container">
        <div className="row">

          <div className="col p-1">
            <h2 className="mt-4">Cadastrar pessoa</h2>
            <UserRegister registerUser={registerUser}></UserRegister>
            <p hidden={!invalidName} className="error">{errorMessage}</p>

            <h2 className="mt-4">Comprar produto</h2>
            <PurchaseRegister users={users} products={products} registerPurchase={registerPurchase}></PurchaseRegister>
            <p hidden={!duplicatePurchase} className="error">{errorMessage}</p>

            <h2 className="display-6 text-center mt-4">Lista de Pessoas</h2>
            <UserContext.Provider value={{ removeUser, removePurchaseUser }}>
              <UsersList users={users} calculateTotal={calculateTotal}></UsersList>
            </UserContext.Provider>
          </div>

          <div className="col-2"></div>

          <div className="col p-1">
            <h2 className="mt-4">{!editingProduct ? "Cadastrar" : "Editar"} produto</h2>
            <ProductRegister product={product} setProduct={setProduct} editingProduct={editingProduct} setEditingProduct={setEditingProduct} registerProduct={registerProduct} editProduct={editProduct}></ProductRegister>
            <p hidden={!duplicateProduct} className="error">{errorMessage
            }</p>

            <h2 className="display-6 text-center mt-4">Lista de Produtos</h2>
            <ProductContext.Provider value={{ setProduct, setEditingProduct, removeProduct }}>
              <ProductsList products={products}></ProductsList>
            </ProductContext.Provider>
          </div>

        </div>
      </div>
    </>
  )
}

export default App;
