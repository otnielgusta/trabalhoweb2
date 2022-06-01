import Image from 'next/image';
import Link from 'next/link';
import BotaoLoginCadastro from '../../public/components/botaoLoginCadastro';
import InputComponent from '../../public/components/input';
import styles from './styles.module.scss'

export default function Login(){
    return(
        <div className={styles.container}>
            <div className={styles.containerLogin}>
                <div className={styles.contentLogin}>
                        <Image 
                            src="/src/images/Logo.png" 
                            alt="Logo"
                            width= '230'
                            height= '134'
                            srcset="" 
                            
                        />
                    
                    <h2 className={styles.titleLogin}>Faça seu login</h2>
                    <div>
                        <form action="">
                            <div className={styles.inputs}>

                            <InputComponent imagem="E-mail" texto="E-mail" />
                            <InputComponent imagem="Senha"  texto="Senha"/>
                            </div>
                            <BotaoLoginCadastro
                                texto="Entrar"
                                onClick={(e)=>{
                                    e.preventDefault()
                                    alert("Botão login")
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
                        width= '20'
                        height= '20'
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