import Image from 'next/image';
import CardHorario from '../../public/components/cardHorario';
import InputComponent from '../../public/components/input';
import styles from './styles.module.scss'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useState } from 'react';
import { Calendar } from "react-modern-calendar-datepicker";
import Link from 'next/link';

export default function Home() {
    const foto = 'https://lh3.googleusercontent.com/bFytQbnUQXsph4pscbna6XyONqWofZc-uOPynCfgo6rbHrS815BxVMqPEHejHohA4-cMi8fI11mDwUJbhNQx=w2390-h955'
    const defaultValue = {
        year: 2022,
        month: 6,
        day: 15,
    };
    const [selectedDay, setSelectedDay] = useState();
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
                                <CardHorario horario='08:30' nome='Leonardo Minatti' />
                                <CardHorario horario='11:00' nome='Leonardo Minatti' />
                            </div>

                        </div>
                        <div className={styles.divHoraDia}>
                            <h2>Tarde</h2>
                            <div className={styles.borda}></div>
                            <div className={styles.horarios}>
                                <CardHorario horario='13:00' nome='Leonardo Minatti' />
                                <CardHorario horario='15:00' nome='Leonardo Minatti' />
                                <CardHorario horario='17:30' nome='Leonardo Minatti' />
                            </div>

                        </div>
                        <div className={styles.divHoraDia}>
                            <h2>Noite</h2>
                            <div className={styles.borda}></div>
                            <div className={styles.horarios}>
                                <CardHorario horario='18:30' nome='Leonardo Minatti' />
                                <CardHorario horario='19:00' nome='Leonardo Minatti' />
                                <CardHorario horario='19:30' nome='Leonardo Minatti' />
                                <CardHorario horario='20:00' nome='Leonardo Minatti' />
                                <CardHorario horario='20:30' nome='Leonardo Minatti' />
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