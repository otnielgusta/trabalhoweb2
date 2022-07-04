import Image from 'next/image';
import Link from 'next/link';
import BotaoLoginCadastro from '../../public/components/botaoLoginCadastro';
import InputComponent from '../../public/components/input';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {login} from '../../controllers/cabelereiro_controller';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.containerLogin}>
                <div className={styles.contentLogin}>
                    <Image
                        src="/src/images/Logo.png"
                        alt="Logo"
                        width='230'
                        height='134'
                        srcset=""

                    />

                    <h2 className={styles.titleLogin}>Faça seu login</h2>
                    <div>
                        <form action="">
                            <div className={styles.inputs}>
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
                                        type="email"
                                        placeholder="E-mail"
                                        onChange={(value)=>{
                                            setEmail(value.target.value);
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
                                        onChange={(value)=>{
                                            setSenha(value.target.value);
                                        }}
                                    />
                                </div>
                                
                            </div>
                                <BotaoLoginCadastro
                                    texto="Entrar"
                                    onClick={async(e) => {
                                        e.preventDefault();
                                        await login(router, email, senha);
                                    }}
                                />

                        </form>
                    </div>
                    <Link className={styles.esqueciSenha} href="{}" >Esqueci minha senha</Link>
                    <Link href={'/cadastro'}>
                        <button className={styles.criarConta}>
                            <Image
                                className={styles.imagemCriar}
                                src="/src/images/Criar.png"
                                alt="Logo"
                                width='20'
                                height='20'
                                srcset=""
                            />
                            <p>Criar conta</p>
                        </button>
                    </Link>

                </div>
            </div>
            <div className={styles.containerImagem}>
            </div>
        </div>
    );
}