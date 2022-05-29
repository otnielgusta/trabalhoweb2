import Image from 'next/image';
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
                            <button type="submit">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.containerImagem}>
            </div>
        </div>
    );
}