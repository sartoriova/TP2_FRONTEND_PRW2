function PlayerRegister(props) {
    function update(e) {
        props.setPlayer({ ...props.player, [e.target.name]: e.target.value });
    }

    function register(e) {
        e.preventDefault();

        !props.editingPlayer ? props.registerPlayer(props.player) : props.editPlayer();

        if (props.editingPlayer) {
            props.setEditingPlayer(false);
        }

        props.setPlayer({ nome: "", salario: "", id_time: "" });
    }

    return (
        <>
            <form className="row g-3" onSubmit={register}>
                <div className="col-12">
                    <label htmlFor="playerName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="playerName" name="nome"
                        placeholder="Digite o nome" required onChange={update} value={props.player.nome} />
                </div>

                <div className="col-12">
                    <label htmlFor="playerSalary" className="form-label">Salário</label>
                    <input type="number" min="0.01" step="0.01" name="salario" className="form-control"
                        id="playerSalary" placeholder="Digite o salário" required onChange={update} value={props.player.salario} />
                </div>

                <div className="col-12">
                    <label htmlFor="playerTeam" className="form-label">Time</label>
                    <input type="number" name="id_time" className="form-control"
                        id="playerTeam" placeholder="Digite o id do time" required onChange={update} value={props.player.id_time} />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">{!props.editingPlayer ? "Cadastrar" : "Editar"}</button>
                </div>
            </form>
        </>
    )
}

export default PlayerRegister;