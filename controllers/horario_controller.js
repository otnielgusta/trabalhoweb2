import cookie from 'js-cookie';
import Host from '../host';
import swal from 'sweetalert';

module.exports = {
    async listarHorariosMarcados(data, setLoading, setHorarios, setStatus) {
        console.log(data);
        var status;
        console.log("ENTROU");
        const session_token = cookie.get("session_token");
        console.log(session_token);

        setLoading(true);
        let config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: JSON.stringify(session_token)
            }
        }

        fetch(Host.baseUrl + "/lista-horarios-marcados?data="+data, config)
        .then((response)=>{
            setStatus(response.status);
            status = response.status;
            return response.json();
        })
        .then((data)=>{
            console.log("O RESPONSE FOI: "+data.msg);
            if (status == 200) {
                console.log(data);
                setHorarios(data);
            }  else if (status == 404) {
                 swal({
                  title: "Sem horarios",
                  text: "O usuário digitado não foi encontrado na base de dados.",
                  icon: "warning",
                  dangerMode: true,
                })
              } else if (status == 401) {
                 swal({
                  title: "Ocorreu um erro",
                  text: data.msg,
          
                  icon: "error",
                  dangerMode: true,
                })
              }
        })
       

        setLoading(false);

    }
}