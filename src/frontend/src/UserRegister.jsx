import { useState } from "react";

function UserRegister(props) {
    const [user, setUser] = useState({
        nome: "",
    });

    function update(e) {
        setUser({...user, [e.target.name] : e.target.value});
    }

    function register(e) {
        e.preventDefault();

        props.registerUser(user);

        setUser({nome: ""});
    }

    return (
        <>
            <form className="row g-3" onSubmit={register}>
              <div className="col-12">
                <label htmlFor="userName" className="form-label">Nome</label>
                <input type="text" className="form-control" id="userName" placeholder="Digite o nome"
                  name="nome" onChange={update} value={user.nome} required />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">Cadastrar</button>
              </div>
            </form>
        </>
    )
}

export default UserRegister;