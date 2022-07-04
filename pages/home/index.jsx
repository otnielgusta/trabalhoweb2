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

export default function Home() {
    const router = useRouter();

    const [selectedDay, setSelectedDay] = useState();
    const [horarios, setHorarios] = useState({});
    const [isLoading, setLoading] = useState({});
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [status, setStatus] = useState();

    const [manha, setManha] = useState([]);
    const [tarde, setTarde] = useState([]);
    const [noite, setNoite] = useState([]);

    async function setHorariosParte() {
        const response = await listarHorariosMarcados(date, setLoading, setHorarios, setStatus);
        console.log("RESPONSE: " + response);
        if (status == 200) {
            

            var manhaa;
            var tardee;
            var noitee;
            if (manha.length == 0) {
                manhaa = horarios.horarios.filter(function (val) {
                    return val.parte == "manha"
                });
                setManha(manhaa);
            }
            if (tarde.length == 0) {
                tardee = horarios.horarios.filter(function (val) {
                    return val.parte == "tarde"
                });
                setTarde(tardee);

            }
            if (noite.length == 0) {
                noitee = horarios.horarios.filter(function (val) {
                    return val.parte == "noite"
                });
                setNoite(noitee);

            }
        }

    }

    useEffect(() => {
        setHorariosParte();

    }, [manha, tarde, noite])

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
                        <Link href={'/perfil'}>
                            <button className={styles.botaoFoto}>
                                <div className={styles.foto}>

                                    <Image
                                        className={styles.fotoUsuario}
                                        src="/src/images/Foto.jpg"
                                        alt="Foto"
                                        width='56'
                                        height='56'

                                    />
                                </div>
                            </button>
                        </Link>
                        <div className={styles.divBemVindo}>
                            <p className={styles.bemVindo}>Bem Vindo</p>
                            <p className={styles.nome}>Tiago Luchemberg</p>
                        </div>
                    </div>
                </div>
                <div className={styles.navDireita}>
                    <div className={styles.logout}>
                        <Image
                            className={styles.imgLogout}
                            src="/src/images/Sair.png"
                            alt="Sair"
                            width='50'
                            height='50'
                            srcset=""

                        />
                    </div>
                </div>
            </nav>
            <div className={styles.content}>
                <div className={styles.contentEsquerda}>
                    <div className={styles.divTitle}>
                        <h1 className={styles.title}>Horários agendados</h1>
                        <p className={styles.subTitle}>Hoje | Dia 06 | Segunda-feira</p>

                    </div>
                    <div className={styles.proximoAtendimento}>
                        <p>Atendimento a seguir</p>
                        <div className={styles.cardProximoAtendimento}>
                            <div className={styles.esquerdaCard}>

                                <div className={styles.bordaLateral}>
                                </div>
                                <div className={styles.fotoProximo}>
                                    <Image
                                        className={styles.fotoUsuario}
                                        src="/src/images/Foto.jpg"
                                        alt="Foto"
                                        width='56'
                                        height='56'

                                    />
                                </div>
                                <p>Leonardo Minatti</p>
                            </div>

                            <div className={styles.proximoHorario}>
                                <Image
                                    className={styles.imagemProximoRelogio}
                                    src="/src/images/Horario.svg"
                                    alt="Foto"
                                    width='24'
                                    height='24'
                                />
                                <p>08:00</p>
                            </div>

                        </div>
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
                                        : <div><p>Ta vazio</p></div>

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
                                        : <div><p>Ta vazio</p></div>

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
                                        : <div><p>Ta vazio</p></div>
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