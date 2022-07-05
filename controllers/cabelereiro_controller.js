import cookie from 'js-cookie';
import Host from '../host';
import swal from 'sweetalert';

module.exports = {
    async login(router, usuario, senha){
        const body = {
            email: usuario,
            senha: senha
        };

        let config = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        
        const response = await fetch(Host.baseUrl + "/login-cabelereiro", config);
        if (response.status == 200) {
      
            const data = await response.json()
            cookie.set("session_token", data.token)
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            localStorage.setItem("horarios", JSON.stringify(data.horarios));

            typeof window !== 'undefined' && router.push({
              pathname: '/home',
      
            });
          } else if (response.status == 403) {
      
            await swal({
              title: "Usuário não encontrado!",
              text: "O usuário digitado não foi encontrado na base de dados.",
              icon: "warning",
              dangerMode: true,
            })
          } else if (response.status == 401) {
      
            await swal({
              title: "Senha incorreta!",
              text: " ",
      
              icon: "error",
              dangerMode: true,
            })
          }
      
    },
    async cadastro(nome, email, senha, jornadaMensal, jornadaDiaria, dataTexto, horarioTexto){
      const body = {
        nome: nome,
        email: email,
        senha: senha,
        jornada_mensal: jornadaMensal,
        jornada_diaria: jornadaDiaria,
        data_texto: dataTexto,
        horarioTexto: horarioTexto
    };
    console.log(JSON.stringify(body));
    // let config = {
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     }
    //   }
    
    // const response = await fetch(Host.baseUrl + "/login-cabelereiro", config);
    // if (response.status == 200) {
  
    //     const data = await response.json()
    //     cookie.set("session_token", data.token)
    //     localStorage.setItem("currentUser", JSON.stringify(data.user));
    //     localStorage.setItem("horarios", JSON.stringify(data.horarios));

    //     typeof window !== 'undefined' && router.push({
    //       pathname: '/home',
  
    //     });
    //   } else if (response.status == 403) {
  
    //     await swal({
    //       title: "Usuário não encontrado!",
    //       text: "O usuário digitado não foi encontrado na base de dados.",
    //       icon: "warning",
    //       dangerMode: true,
    //     })
    //   } else if (response.status == 401) {
  
    //     await swal({
    //       title: "Senha incorreta!",
    //       text: " ",
  
    //       icon: "error",
    //       dangerMode: true,
    //     })
    //   }
    }
}