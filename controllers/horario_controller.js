import cookie from 'js-cookie';
import Host from '../host';
import swal from 'sweetalert';
module.exports = {
    async listarHorariosMarcados(data, setLoading, setHorarios, setStatus) {
        const session_token = cookie.get("session_token");
        let config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: JSON.stringify(session_token)
            }
        }

        fetch(Host.baseUrl + "/lista-horarios-marcados?data=" + data, config)
            .then((response) => {
                if (response.status == 200) {
                    Promise.resolve(response.json()).then((resolve)=>{
                        console.log(resolve.horarios);
                        setHorarios(resolve.horarios);
                        setLoading(false);
                    })
                }else if (response.status == 404) {
                    swal({
                        title: "Sem horarios",
                        text: "O usuário digitado não foi encontrado na base de dados.",
                        icon: "warning",
                        dangerMode: true,
                    })
                    setLoading(false);

                } else if (response.status == 401) {
                    swal({
                        title: "Ocorreu um erro",
                        text: resolve.data[0].msg,

                        icon: "error",
                        dangerMode: true,
                    })
                    setLoading(false);

                }
            })


    }
}