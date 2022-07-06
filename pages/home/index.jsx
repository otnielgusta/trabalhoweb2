import Image from 'next/image';
import CardHorario from '../../public/components/cardHorario';
import InputComponent from '../../public/components/input';
import styles from './styles.module.scss'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useEffect, useState } from 'react';
import { Calendar } from "react-modern-calendar-datepicker";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { listarHorariosMarcados } from '../../controllers/horario_controller';
import { auth } from '../../controllers/cabelereiro_controller';
import cookie from 'js-cookie';
import Host from '../../host';
import swal from 'sweetalert';

export default function Home() {
    const router = useRouter();
    const [usuario, setUsuario] = useState({});

    const [selectedDay, setSelectedDay] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() ,
        day: new Date().getDate()
    });
    const [horarios, setHorarios] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = useState();

    const [manha, setManha] = useState([]);
    const [tarde, setTarde] = useState([]);
    const [noite, setNoite] = useState([]);
    const myLoader = ({ src }) => {
        return src;
    }

    function setHorariosParte() {
        if (isLoading) {
            return
        }

        const date = new Date(selectedDay.year, selectedDay.month -1, selectedDay.day).toISOString().slice(0, 10)
        setLoading(true);
        const session_token = cookie.get("session_token");
        let config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: JSON.stringify(session_token)
            }
        }
        fetch(Host.baseUrl + "/lista-horarios-marcados?data=" + date, config)
            .then((response) => {

                if (response.status == 200) {
                    Promise.resolve(response.json()).then((resolve) => {
                        console.log(resolve);

                        console.log(resolve.horarios);
                        setHorarios(resolve.horarios);
                        setLoading(false);
                    })
                } else if (response.status == 404) {
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
            });


        if (horarios.length > 0) {

            if (manha.length == 0) {
                let manhaa = horarios.filter(function (val) {
                    return val.parte == "manha"
                });
                setManha(manhaa);
            }
            if (tarde.length == 0) {
                let tardee = horarios.filter(function (val) {
                    return val.parte == "tarde"
                });
                setTarde(tardee);

            }
            if (noite.length == 0) {
                let noitee = horarios.filter(function (val) {
                    return val.parte == "noite"
                });

                setNoite(noitee);

            }
        }
        setLoading(false);


    }

    useEffect(() => {

        if (cookie.get("session_token")) {
            auth(router, "home");
        } else {
            typeof window !== 'undefined' && router.push({
                pathname: '/login',
            });
        }
        if (window.localStorage.getItem("currentUser")) {

            setUsuario(JSON.parse(window.localStorage.getItem("currentUser")));
        }

        if (isLoading == false) {

            setHorariosParte();
        }
        console.log(selectedDay);
    }, [ selectedDay])

    return (
        <div className={styles.container}>
            <nav>
                <div className={styles.navEsquerda}>
                    <div className={styles.divLogo}>
                        <Image
                            src="/src/images/Logo.png"
                            alt="Logo"
                            width='137'
                            height='80'
                            srcset=""

                        />
                    </div>
                    <div className={styles.fotoNomeUsuario}>
                        <Link passHref href={'/perfil'}>
                            <a target="_self" className={styles.botaoFoto}>
                                <div className={styles.foto}>

                                    {
                                        usuario.foto ? <Image
                                            className={styles.fotoUsuario}
                                            loader={myLoader}
                                            src={usuario.foto}
                                            alt="Foto"
                                            width='56'
                                            height='56'

                                        /> :
                                            <Image
                                                className={styles.fotoUsuario}
                                                src="/src/images/Foto.jpg"
                                                alt="Foto"
                                                width='56'
                                                height='56'

                                            />
                                    }
                                </div>
                            </a>
                        </Link>
                        <div className={styles.divBemVindo}>
                            <p className={styles.bemVindo}>Bem Vindo</p>
                            <p className={styles.nome}>{usuario.nome}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.navDireita}>
                    <div className={styles.logout}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                cookie.remove("session_token");
                                window.localStorage.removeItem("currentUser");
                                router.push({
                                    pathname: '/login'
                                })
                            }}
                            className={styles.btnLogout}>

                            <Image
                                className={styles.imgLogout}
                                src="/src/images/Sair.png"
                                alt="Sair"
                                width='50'
                                height='50'
                                srcset=""

                            />
                        </button>

                    </div>
                </div>
            </nav>
            <div className={styles.content}>
                <div className={styles.contentEsquerda}>
                    <div className={styles.divTitle}>
                        <h1 className={styles.title}>Horários agendados</h1>
                        <p className={styles.subTitle}>{selectedDay.day + "/" + selectedDay.month + "/" + selectedDay.year}</p>

                    </div>

                    <div className={styles.divHorarios}>
                        <div className={styles.divHoraDia}>
                            <h2>Manhã</h2>
                            <div className={styles.borda}></div>
                            <div className={styles.horarios}>
                                {
                                    manha.length > 0 ?
                                        manha.map((e) => {
                                            return <CardHorario horario={e.horario} nome={e.nome} foto={e.foto} />

                                        })
                                        : <div><p>Sem horário marcado</p></div>

                                }

                            </div>

                        </div>
                        <div className={styles.divHoraDia}>
                            <h2>Tarde</h2>
                            <div className={styles.borda}></div>
                            <div className={styles.horarios}>
                                {

                                    tarde.length > 0 ?

                                        tarde.map((e) => {
                                            return <CardHorario horario={e.horario} nome={e.nome} foto={e.foto} />

                                        })
                                        : <div><p>Sem horário marcado</p></div>

                                }
                            </div>

                        </div>
                        <div className={styles.divHoraDia}>
                            <h2>Noite</h2>
                            <div className={styles.borda}></div>
                            <div className={styles.horarios}>
                                {
                                    noite.length > 0 ?
                                        noite.map((e) => {
                                            return <CardHorario horario={e.horario} nome={e.nome} foto={e.foto} />

                                        })
                                        : <div><p>Sem horário marcado</p></div>
                                }
                            </div>

                        </div>

                    </div>
                </div>
                <div className={styles.contentDireita}>
                    <div className={styles.teste}>

                        <div className={styles.calendario}>


                            <Calendar
                                value={selectedDay}
                                onChange={setSelectedDay}
                                colorPrimary='#FF9000'
                                calendarClassName={styles.calendarioStyle}

                            />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}