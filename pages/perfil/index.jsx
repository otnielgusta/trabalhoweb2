import styles from './styles.module.scss'
import Image from 'next/image';
import InputComponent from '../../public/components/input';
import Link from 'next/link';


export default function Perfil() {
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
                    <Image
                        className={styles.imgFoto}
                        src="/src/images/Foto.jpg"
                        alt="Foto"
                        width='186'
                        height='186'

                    />
                    <div className={styles.divCamera}>
                        <Image
                            className={styles.imgFoto}
                            src="/src/images/Camera.svg"
                            alt="Foto"
                            width='20'
                            height='20'

                        />
                        <input className={styles.inputImage} type='file' accept='image/*' />

                    </div>
                </div>
                <div className={styles.divForm}>
                    <h1>Meu perfil</h1>
                    <form action="">
                        <div className={styles.inputNomeEmail}>

                            <InputComponent imagem="Nome" type="text" texto="Nome" value="Otniel Silva" />
                            <InputComponent imagem="E-mail" type="email" texto="E-mail" value="otnielsilvag4@gmail.com" />
                        </div>
                        <div className={styles.inputSenha}>
                            <InputComponent imagem="Senha" type="password" texto="Senha atual" value="" />
                            <InputComponent imagem="Senha" type="password" texto="Nova senha" value="" />
                            <InputComponent imagem="Senha" type="password" texto="Confirma senha" value="" />

                        </div>
                        <button
                            className={styles.botao}
                            type="submit"
                            onSubmit={() => { }}
                        >Confirmar mudanças
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}