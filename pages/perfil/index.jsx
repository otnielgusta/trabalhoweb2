import styles from './styles.module.scss'
import Image from 'next/image';
import InputComponent from '../../public/components/input';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../../controllers/firebase';
import { v4 } from "uuid";
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import Host from '../../host';
import swal from 'sweetalert';
import { auth } from '../../controllers/cabelereiro_controller';


const Perfil = () => {
    const router = useRouter();
    const [usuario, setUsuario] = useState({});
    const [atualizar, setAtualizar] = useState(true);

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const [image, setImage] = useState(null);
    const [enabledButton, setEnabledButton] = useState(false);
    const [check, setCheck] = useState(false);
    const myLoader = ({ src }) => {
        return src;
    }

    const buscaCabelereiro = async () => {
        const session_token = cookie.get("session_token");
        let config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: JSON.stringify(session_token)
            }
        }
        const response = await fetch(Host.baseUrl + "/busca-cabelereiro", config)

        if (response.status == 200) {
            const resolve = await response.json();

            localStorage.setItem("currentUser", resolve.user);
            setUsuario(JSON.parse(resolve.user));
            setAtualizar(true);

        } else if (response.status == 401) {

            swal({
                title: "Ocorreu um erro",
                text: " ",

                icon: "error",
                dangerMode: true,
            })

        } else if (response.status == 500) {

            swal({
                title: "Ocorreu um erro",
                text: " ",

                icon: "error",
                dangerMode: true,
            })

        }

    }

    const atualizaCabelereiro = async (e) => {
        e.preventDefault();
        const session_token = cookie.get("session_token");
        const body = {
            nome, nome,
            email, email,
            senha, senha
        };
        console.log(body);
        let config = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: JSON.stringify(session_token)
            }
        }
        console.log("body");
        console.log(body);
        console.log(session_token);
        fetch(Host.baseUrl + "/atualiza-cabelereiro", config)
            .then((response) => {
                if (response.status == 202) {
                    swal({
                        title: "Dados atualizados com Sucesso!",
                        text: " ",
                        icon: "success",
                        dangerMode: true,
                    })
                    buscaCabelereiro();

                } else if (response.status == 401) {
                    Promise.resolve(response.json()).then((resolve) => {
                        console.log(resolve);
                        swal({
                            title: "Ocorreu um erro",
                            text: resolve.message,

                            icon: "error",
                            dangerMode: true,
                        })
                    })

                } else if (response.status == 500) {
                    Promise.resolve(response.json()).then((resolve) => {
                        console.log(resolve);

                        swal({
                            title: "Ocorreu um erro",
                            text: resolve.message,

                            icon: "error",
                            dangerMode: true,
                        })
                    })

                }

            })
    }


    const handleUpload = (e) => {
        e.preventDefault();
        if (image == null) return;
        const nome = v4();
        const imageRef = ref(storage, `images/${nome}`);
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(ref(storage, `images/${nome}`),)
                    .then((url) => {
                        const session_token = cookie.get("session_token");
                        const body = {
                            foto: url,
                        };

                        let config = {
                            method: 'POST',
                            body: JSON.stringify(body),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                authorization: JSON.stringify(session_token)
                            }
                        }
                        console.log(body);
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
                                    buscaCabelereiro();

                                } else if (response.status == 401) {
                                    Promise.resolve(response.json()).then((resolve) => {
                                        console.log(resolve);
                                        swal({
                                            title: "Ocorreu um erro",
                                            text: resolve.msg,

                                            icon: "error",
                                            dangerMode: true,
                                        })
                                    })

                                } else if (response.status == 500) {
                                    Promise.resolve(response.json()).then((resolve) => {
                                        console.log(resolve);

                                        swal({
                                            title: "Ocorreu um erro",
                                            text: resolve.msg,

                                            icon: "error",
                                            dangerMode: true,
                                        })
                                    })

                                }

                            })
                    });
                setCheck(false);
            })
        setEnabledButton(false);
    };

    useEffect(() => {
        if (cookie.get("session_token")) {
            auth(router, "perfil");
        } else {
            typeof window !== 'undefined' && router.push({
                pathname: '/login',
            });
        }
        if (window.localStorage.getItem("currentUser") && atualizar) {

            setUsuario(JSON.parse(window.localStorage.getItem("currentUser")));
            setAtualizar(false);

        }

        setNome(usuario.nome);
        setEmail(usuario.email);


    }, [router.pathname, atualizar])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.divVoltar}>
                    <Link href={'/home'}>
                        <button className={styles.botaoVoltar}>
                            <Image
                                className={styles.imgVoltar}
                                src="/src/images/Seta.svg"
                                alt="Foto"
                                width='50'
                                height='50'

                            />
                        </button>
                    </Link>
                </div>
            </div>
            <div className={styles.corpo}>

                <div className={styles.divFoto}>
                    {
                        usuario.foto ? <Image
                            className={styles.imgFoto}
                            loader={myLoader}
                            src={usuario.foto}
                            alt="Foto"
                            width='186'
                            height='186'

                        /> :
                            <Image
                                className={styles.imgFoto}
                                src="/src/images/Foto.jpg"
                                alt="Foto"
                                width='186'
                                height='186'

                            />
                    }

                    <div className={styles.divCamera}>
                        {
                            check ?
                                <Image
                                    className={styles.imgFoto}
                                    src="/src/images/check.png"
                                    alt="Foto"
                                    width='25'
                                    height='25'

                                />
                                :
                                <Image
                                    className={styles.imgFoto}
                                    src="/src/images/Camera.svg"
                                    alt="Foto"
                                    width='20'
                                    height='20'

                                />
                        }
                        <input
                            className={styles.inputImage}
                            type='file'
                            accept='image/*'

                            onInput={(e) => {
                                setImage(e.target.files[0]);
                                setCheck(true);
                            }}
                        />

                    </div>
                </div>
                {
                    check ? <button className={styles.salvaFoto} onClick={handleUpload} >Salvar foto</button> : <div></div>
                }

                <div className={styles.divForm}>
                    <h1>Meu perfil</h1>
                    <form onSubmit={atualizaCabelereiro} >
                        <div className={styles.inputNomeEmail}>
                            <div className={styles.divInput}>
                                <Image
                                    className={styles.iconInput}
                                    src={'/src/images/Nome.png'}
                                    alt="Logo"
                                    width='20'
                                    height='18'
                                    srcset=""

                                />
                                <input
                                    type='text'
                                    placeholder="Nome"
                                    value={nome}
                                    onChange={(e) => {
                                        setNome(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={styles.divInput}>
                                <Image
                                    className={styles.iconInput}
                                    src={'/src/images/E-mail.png'}
                                    alt="Logo"
                                    width='20'
                                    height='18'
                                    srcset=""

                                />
                                <input
                                    type='email'
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.inputSenha}>
                            <div className={styles.divInput}>
                                <Image
                                    className={styles.iconInput}
                                    src={'/src/images/Senha.png'}
                                    alt="Logo"
                                    width='20'
                                    height='18'
                                    srcset=""

                                />
                                <input
                                    type='password'
                                    placeholder="Nova senha"
                                    onChange={(e) => {
                                        setSenha(e.target.value);
                                    }}
                                />
                            </div>

                        </div>
                        <button
                            className={styles.botao}
                            type="submit"
                        >Confirmar mudanças
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Perfil;