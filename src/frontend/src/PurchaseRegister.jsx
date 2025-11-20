import { useState } from "react";

function PurchaseRegister(props) {
    const [purchase, setPurchase] = useState({
        id_produto: 0,
        id_usuario: 0,
    });

    function update(e) {
        setPurchase({ ...purchase, [e.target.name]: e.target.value });
    }

    function register(e) {
        e.preventDefault();

        props.registerPurchase(purchase);

        setPurchase({ id_produto: 0, id_usuario: 0 });
    }

    return (
        <>
            <form className="row g-3" onSubmit={register}>
                <div className="col-12">
                    <fieldset>
                        <label htmlFor="selectedUser" className="form-label pt-2">Pessoa</label>
                        <select id="selectedUser" className="form-select" name="id_usuario" value={purchase.id_usuario} onChange={update} required>
                            <option value="">Selecione uma pessoa</option>
                            {props.users.map((user, index) => (
                                <option key={index} value={user.id}>{user.nome}</option>
                            ))};
                        </select>

                        <label htmlFor="selectedProduct" className="form-label pt-2">Produto</label>
                        <select id="selectedProduct" className="form-select" name="id_produto" value={purchase.id_produto} onChange={update} required>
                            <option value="">Selecione um produto</option>
                            {props.products.map((product, index) => (
                                <option key={index} value={product.id}>{product.nome}</option>
                            ))};
                        </select>
                    </fieldset>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Comprar</button>
                </div>
            </form>
        </>
    )
}

export default PurchaseRegister;