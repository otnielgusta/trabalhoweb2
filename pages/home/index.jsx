import Image from 'next/image';
import Link from 'next/link';
import InputComponent from '../../public/components/input';
import styles from './styles.module.scss'

export default function Home(){
    return(
        <div className={styles.container}>
            <nav>
                <div className={styles.navEsquerda}>
                    <div className={styles.divLogo}>
                        <Image 
                            src="/src/images/Logo.png" 
                            alt="Logo"
                            width= '137'
                            height= '80'
                            srcset="" 
                            
                        />
                    </div>
                    <div className={styles.fotoNomeUsuario}>
                        <div className={styles.foto}>

                            <Image 
                                className={styles.fotoUsuario}
                                src="/src/images/Foto.jpg" 
                                alt="Foto"
                                width= '56'
                                height= '56'
                                srcset="" 
                                
                            />
                        </div>
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
                        width= '50'
                        height= '50'
                        srcset="" 
                        
                    />
                </div>  
                </div>
            </nav>
            <div className={styles.content}>
                <div className={styles.contentEsquerda}>

                </div>
                <div className={styles.contentDireita}>
                    <div className={styles.divTitle}>
                        <h1>Horários agendados</h1>
                        <p>Hoje | Dia 06 | Segunda-feira</p>

                    </div>
                    <div className={styles.proximoAtendimento}>
                        <p>Atendimento a seguir</p>
                    </div>
                </div>
            </div>
        </div>
    );
}