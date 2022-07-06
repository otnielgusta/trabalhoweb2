import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BotaoLoginCadastro from '../../public/components/botaoLoginCadastro';
import InputComponent from '../../public/components/input';
import styles from './styles.module.scss';
import { cadastro } from '../../controllers/cabelereiro_controller';
import { useRouter } from 'next/router';

export default function Cadastro() {
    const router = useRouter();


    const [horarios, setHorarios] = useState([{
        "id": "0",
        "horario": "07:00",
        "parte": "manha"
    },
    {
        "id": "1",
        "horario": "07:30",
        "parte": "manha"
    },
    {
        "id": "2",
        "horario": "08:00",
        "parte": "manha"
    },
    {
        "id": "3",
        "horario": "08:30",
        "parte": "manha"
    },
    {
        "id": "4",
        "horario": "09:00",
        "parte": "manha"
    },
    {
        "id": "5",
        "horario": "09:30",
        "parte": "manha"
    },
    {
        "id": "6",
        "horario": "10:00",
        "parte": "manha"
    },
    {
        "id": "7",
        "horario": "10:30",
        "parte": "manha"
    },
    {
        "id": "8",
        "horario": "11:00",
        "parte": "manha"
    },
    {
        "id": "9",
        "horario": "11:30",
        "parte": "manha"
    },
    {
        "id": "12",
        "horario": "13:00",
        "parte": "tarde"
    },
    {
        "id": "13",
        "horario": "13:30",
        "parte": "tarde"
    },
    {
        "id": "14",
        "horario": "14:00",
        "parte": "tarde"
    },
    {
        "id": "15",
        "horario": "14:30",
        "parte": "tarde"
    },
    {
        "id": "16",
        "horario": "15:00",
        "parte": "tarde"
    },
    {
        "id": "17",
        "horario": "15:30",
        "parte": "tarde"
    },
    {
        "id": "18",
        "horario": "16:00",
        "parte": "tarde"
    },
    {
        "id": "19",
        "horario": "16:30",
        "parte": "tarde"
    },
    {
        "id": "20",
        "horario": "17:00",
        "parte": "tarde"
    },
    {
        "id": "21",
        "horario": "17:30",
        "parte": "tarde"
    },
    {
        "id": "24",
        "horario": "19:00",
        "parte": "noite"
    },
    {
        "id": "25",
        "horario": "19:30",
        "parte": "noite"
    },
    {
        "id": "26",
        "horario": "20:00",
        "parte": "noite"
    },
    {
        "id": "27",
        "horario": "20:30",
        "parte": "noite"
    }]);
    const [manha, setManha] = useState([]);
    const [tarde, setTarde] = useState([]);
    const [noite, setNoite] = useState([]);
    const [email, setEmail] = useState("");
    
    const [nome, setNome] = useState("");
    const [horarioTexto, setHorarioTexto] = useState("");
    const [dataTexto, setDataTexto] = useState("");
    const [senha, setSenha] = useState("");
    const [horariosSelecionados, setHorariosSelecionados] = useState([])

    const [diasSelecionados, setDiasSelecionados] = useState([]);

    function getHoraDia() {
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
    }

    function onChangetDia(val) {
        if (diasSelecionados.includes(val.target.value)) {
            const temp = [...diasSelecionados];
            const index = temp.indexOf(val.target.value);
            temp.splice(index, 1);
            setDiasSelecionados(temp);
        } else {
            setDiasSelecionados(prevArray => [...prevArray, val.target.value]);

        }
        console.log(diasSelecionados);
    }
    useEffect(() => {
        getHoraDia();
    })
    return (
        <div className={styles.container}>
            <div className={styles.containerImagem}>
            </div>
            <div className={styles.containerCadastro}>
                <div className={styles.contentCadastro}>
                    <Image
                        src="/src/images/Logo.png"
                        alt="Logo"
                        width='230'
                        height='134'
                        srcset=""

                    />
                    <h2 className={styles.titleCadastro}>Faça seu Cadastro</h2>
                    <div>
                        <form action="">
                            <div className={styles.inputs}>

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
                                        onChange={(value) => {
                                            setNome(value.target.value);
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
                                        placeholder="E-mail"
                                        onChange={(value) => {
                                            setEmail(value.target.value);
                                        }}
                                    />
                                </div>
                                <div className={styles.divCheckbox}>
                                    <fieldset className={styles.field_set}>
                                        <legend>Selecione sua jornada semanal</legend>
                                        <input onChange={(val) => { onChangetDia(val) }} className={styles.checkbox} type="checkbox" name="action" id="track" value="2" /><label for="track">Segunda-Feira</label><br />
                                        <input onChange={(val) => { onChangetDia(val) }} className={styles.checkbox} type="checkbox" name="action" id="event" value="3" /><label for="event">Terça-Feira</label><br />
                                        <input onChange={(val) => { onChangetDia(val) }} className={styles.checkbox} type="checkbox" name="action" id="message" value="4" /><label for="message">Quarta-Feira</label><br />
                                        <input onChange={(val) => { onChangetDia(val) }} className={styles.checkbox} type="checkbox" name="action" id="message" value="5" /><label for="message">Quinta-Feira</label><br />
                                        <input onChange={(val) => { onChangetDia(val) }} className={styles.checkbox} type="checkbox" name="action" id="message" value="6" /><label for="message">Sexta-Feira</label><br />
                                    </fieldset>
                                </div>
                                <div className={styles.divCheckbox}>
                                    <fieldset className={styles.field_set_horarios}>
                                        <legend>Selecione sua jornada diária</legend>
                                        <div className={styles.horarios}>
                                            <h1 className={styles.title}>Manhã</h1>
                                            {
                                                manha.length > 0 ? manha.map((hor) => {
                                                    return <div><input onChange={(val) => {
                                                        if (horariosSelecionados.includes(val.target.value)) {
                                                            const temp = [...diasSelecionados];
                                                            const index = temp.indexOf(val.target.value);
                                                            temp.splice(index, 1);
                                                            setHorariosSelecionados(temp);
                                                        } else {
                                                            horariosSelecionados.push(val.target.value);

                                                        }
                                                        console.log(horariosSelecionados)
                                                    }} className={styles.checkbox} type="checkbox" name="action" id="track" value={hor.id} /><label for="track">{hor.horario}</label><br /></div>

                                                }) : <div></div>

                                            }
                                        </div>
                                        <div className={styles.horarios}>
                                            <h1 className={styles.title}>Tarde</h1>

                                            {
                                                tarde.length > 0 ? tarde.map((hor) => {
                                                    return <div><input onChange={(val) => {
                                                        if (val.target.checked && horariosSelecionados.includes(val.target.value)) {
                                                            const temp = [...diasSelecionados];
                                                            const index = temp.indexOf(val.target.value);
                                                            temp.splice(index, 1);
                                                            setHorariosSelecionados(temp);
                                                        } else {
                                                            horariosSelecionados.push(val.target.value);
                                                        }
                                                        console.log(horariosSelecionados)
                                                    }} className={styles.checkbox} type="checkbox" name="action" id="track" value={hor.id} /><label for="track">{hor.horario}</label><br /></div>

                                                }) : <div></div>
                                            }
                                        </div>
                                        <div className={styles.horarios}>
                                            <h1 className={styles.title}>Noite</h1>

                                            {
                                                noite.length > 0 ? noite.map((hor) => {
                                                    return <div><input onChange={(val) => {

                                                        if (val.target.checked && horariosSelecionados.includes(val.target.value)) {
                                                            const temp = [...diasSelecionados];
                                                            const index = temp.indexOf(val.target.value);
                                                            temp.splice(index, 1);
                                                            setHorariosSelecionados(temp);
                                                        } else {
                                                            horariosSelecionados.push(val.target.value);
                                                        }
                                                        console.log(horariosSelecionados)
                                                    }} className={styles.checkbox} type="checkbox" name="action" id="track" value={hor.id} /><label for="track">{hor.horario}</label><br /></div>

                                                }) : <div></div>
                                            }
                                        </div>

                                    </fieldset>
                                </div>
                                <div className={styles.divInput}>
                                    <Image
                                        className={styles.iconInput}
                                        src={'/src/images/Calendario.svg'}
                                        alt="Logo"
                                        width='20'
                                        height='18'
                                        srcset=""

                                    />
                                    <input
                                        type="text"
                                        placeholder="Jornada. Ex.: Seg. à Sex"
                                        onChange={(value) => {
                                            setDataTexto(value.target.value);
                                        }}
                                    />
                                </div>

                                <div className={styles.divInput}>
                                    <Image
                                        className={styles.iconInput}
                                        src={'/src/images/Horariocinza.svg'}
                                        alt="Logo"
                                        width='20'
                                        height='20'
                                        srcset=""

                                    />
                                    <input
                                        type="text"
                                        placeholder="Horário. Ex.: 8h às 18h"
                                        onChange={(value) => {
                                            setHorarioTexto(value.target.value);
                                        }}
                                    />
                                </div>

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
                                        type="password"
                                        placeholder="Senha"
                                        onChange={(value) => {
                                            setSenha(value.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <BotaoLoginCadastro
                                texto="Cadastrar"
                                onClick={(e) => {
                                    e.preventDefault()
                                    cadastro(router, nome, email, senha, diasSelecionados, horariosSelecionados, dataTexto, horarioTexto);
                                }}
                            />
                        </form>
                    </div>
                    <Link href={'/login'}>

                        <button className={styles.criarConta}>
                            <Image
                                src="/src/images/Voltar.png"
                                alt="Logo"
                                width='20'
                                height='20'
                                srcset=""

                            />
                            <p>Voltar para o login</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    );
}