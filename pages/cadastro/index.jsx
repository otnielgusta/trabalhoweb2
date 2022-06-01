import Image from 'next/image';
import Link from 'next/link';
import BotaoLoginCadastro from '../../public/components/botaoLoginCadastro';
import InputComponent from '../../public/components/input';
import styles from './styles.module.scss'

export default function Cadastro(){
    return(
        <div className={styles.container}>
            <div className={styles.containerImagem}>
            </div>
            <div className={styles.containerCadastro}>
                <div className={styles.contentCadastro}>
                <Image 
                        src="/src/images/Logo.png" 
                        alt="Logo"
                        width= '230'
                        height= '134'
                        srcset="" 

                        />
                    <h2 className={styles.titleCadastro}>Faça seu Cadastro</h2>
                    <div>
                        <form action="">
                            <div className={styles.inputs}>

                            <InputComponent imagem="Nome" texto="Nome" />
                            <InputComponent imagem="E-mail" texto="E-mail" />
                            <InputComponent imagem="Senha"  texto="Senha"/>
                            </div>
                            <BotaoLoginCadastro
                                texto="Cadastrar"
                                onClick={()=>{
                                    alert("Botão cadastro")
                                }}
                            />
                        </form>
                    </div>
                    <Link href={'/login'}>

                    <button className={styles.criarConta}>
                    <Image 
                        src="/src/images/Voltar.png" 
                        alt="Logo"
                        width= '20'
                        height= '20'
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