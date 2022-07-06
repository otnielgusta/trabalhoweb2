import cookie from 'js-cookie';
import Host from '../host';
import swal from 'sweetalert';

module.exports = {
  async login(router, usuario, senha) {
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
      localStorage.setItem("currentUser", data.user);
      console.log(data.user);
      localStorage.setItem("horarios", data.horarios);

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
  async cadastro(router, nome, email, senha, jornadaMensal, jornadaDiaria, dataTexto, horarioTexto) {
    const body = {
      nome: nome,
      email: email,
      senha: senha,
      jornada_semanal: jornadaMensal,
      jornada_diaria: jornadaDiaria,
      data_texto: dataTexto,
      horario_texto: horarioTexto
    };
    console.log(JSON.stringify(body));
    let config = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(Host.baseUrl + "/cadastro-cabelereiro", config);
    const data = await response.json()
    if (response.status == 201) {
      await swal({
        title: "Usuário cadastrado com Sucesso!",
        text: " ",
        icon: "success",
        dangerMode: true,
      })
      typeof window !== 'undefined' && router.push({
        pathname: '/login',

      });
    } else if (response.status == 409) {

      await swal({
        title: "Email já cadastrado!",
        text: "O email digitado já está cadastrado na base de dados.",
        icon: "warning",
        dangerMode: true,
      })
    } else if (response.status == 500) {

      await swal({
        title: data.message,
        text: " ",

        icon: "error",
        dangerMode: true,
      })
    }
  },

  async salvaFoto(foto, router) {
    const session_token = cookie.get("session_token");
    const body = {
      foto: foto,
    };

    let config = {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: JSON.stringify(session_token)
      }
    }
    console.log(data);
    console.log(session_token);
    fetch(Host.baseUrl + "/atualiza-foto-cabelereiro", config)
      .then((response) => {
        if (response.status == 202) {
          swal({
            title: "Foto atualizada com Sucesso!",
            text: " ",
            icon: "success",
            dangerMode: true,
          })
          typeof window !== 'undefined' && router.push({
            pathname: '/perfil',

          });
        } else if (response.status == 401) {
          swal({
            title: "Ocorreu um erro",
            text: resolve.data[0].msg,

            icon: "error",
            dangerMode: true,
          })
          setLoading(false);

        } else if (response.status == 500) {
          swal({
            title: "Ocorreu um erro",
            text: resolve.data[0].msg,

            icon: "error",
            dangerMode: true,
          })
          setLoading(false);

        }

      })


  },

  async auth(router, caminho) {
    const token = cookie.get("session_token");
    let config = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: (token)
      }
    }

    fetch(Host.baseUrl + "/auth", config)
      .then((response) => {
        if (response.status == 200) {

          typeof window !== 'undefined' && router.push({
            pathname: "/"+caminho,
          });
        } else if (response.status == 500) {
          swal({
            title: "Ocorreu um erro",
            text: " ",
            icon: "error",
            dangerMode: true,
          })
          typeof window !== 'undefined' && router.push({
            pathname: '/login',
          });

        } else if (response.status == 401) {
          Promise.resolve(response.json()).then((resolve) => {
            swal({
              title: resolve.msg,
              text: " ",
              icon: "error",
              dangerMode: true,
            })
            typeof window !== 'undefined' && router.push({
              pathname: '/login',
            });
          })

        }
      })
  }
}