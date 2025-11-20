import "./App.css";
import axios from "axios";
import { useState, useEffect } from 'react';
import ProductsList from "./TeamsList";
import ProductRegister from "./ProductRegister";
import ChampionshipRegister from "./ChampionshipRegister";
import PurchaseRegister from "./PurchaseRegister";
import { ProductContext } from "./TeamContext";
import { ChampionshipContext } from "./ChampionshipContext";
import ChampionshipList from "./ChampionshipsList";

function App() {
  const [championships, setChampionships] = useState([]);
  const [invalidName, setInvalidName] = useState("");

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(false);
  const [editingChampionship, setEditingChampionship] = useState(false);
  const [duplicateProduct, setDuplicateProduct] = useState(false);
  const [product, setProduct] = useState({
    nome: "",
    preco: "",
  });
  const [championship, setChampionship] = useState({
    nome: "",
  });

  const [duplicatePurchase, setDuplicatePurchase] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:3000"
  });

  async function loadChampionships() {
    try {
      let res = await api.get("/campeonatos");
      setChampionships(res.data);
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
    loadChampionships();
    //loadProducts();
  }, []);

  async function registerChampionship(newChampionship) {
    try {
      await api.post("/campeonatos", newChampionship);
      await loadChampionships();

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

  async function removeChampionship(e) {
    try {
      await api.delete(`/campeonatos/${e.target.id}`);
      await loadChampionships();
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

  async function registerProduct() {
    try {
      await api.post("/produtos", product);
      await loadProducts();
      await loadChampionships();

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
      await loadChampionships();

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

  async function editChampionship() {
    try {
      await api.put(`/campeonatos/${championship.id}`, championship);
      //await loadProducts();
      await loadChampionships();
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

  async function removeProduct(e) {
    try {
      await api.delete(`/produtos/${e.target.id}`);
      //await loadProducts();
      await loadChampionships();
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
      await loadChampionships();

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
      await loadChampionships();
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
            <h2 className="mt-4">{!editingChampionship ? "Cadastrar" : "Editar"} Campeonato</h2>
            <ChampionshipRegister championship={championship} setChampionship={setChampionship} editingChampionship={editingChampionship} editChampionship={editChampionship} setEditingChampionship={setEditingChampionship} registerChampionship={registerChampionship}></ChampionshipRegister>
            <p hidden={!invalidName} className="error">{errorMessage}</p>

            <h2 className="mt-4">Comprar produto</h2>
            <PurchaseRegister users={championships} products={products} registerPurchase={registerPurchase}></PurchaseRegister>
            <p hidden={!duplicatePurchase} className="error">{errorMessage}</p>

            <h2 className="display-6 text-center mt-4">Lista de Campeonatos</h2>
            <ChampionshipContext.Provider value={{ setChampionship, setEditingChampionship, removeChampionship }}>
              <ChampionshipList championships={championships}></ChampionshipList>
            </ChampionshipContext.Provider>
          </div>

          <div className="col-2"></div>

          <div className="col p-1">
            <h2 className="mt-4">{!editingProduct ? "Cadastrar" : "Editar"} produto</h2>
            <ProductRegister product={product} setProduct={setProduct} editingProduct={editingProduct} setEditingProduct={setEditingProduct} registerProduct={registerProduct} editProduct={editProduct}></ProductRegister>
            <p hidden={!duplicateProduct} className="error">{errorMessage}</p>

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
