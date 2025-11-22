function TeamRegister(props) {
    function update(e) {
        props.setTeam({ ...props.team, [e.target.name]: e.target.value });
    }

    function register(e) {
        e.preventDefault();

        !props.editingTeam ? props.registerTeam(props.team) : props.editTeam();

        if (props.editingTeam) {
            props.setEditingTeam(false);
        }

        props.setTeam({ nome: "" });
    }

    return (
        <>
            <form className="row g-3" onSubmit={register}>
                <div className="col-12">
                    <label htmlFor="teamName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="teamName" name="nome"
                        placeholder="Digite o nome" required onChange={update} value={props.team.nome} />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">{!props.editingTeam ? "Cadastrar" : "Editar"}</button>
                </div>
            </form>
        </>
    )
}

export default TeamRegister;