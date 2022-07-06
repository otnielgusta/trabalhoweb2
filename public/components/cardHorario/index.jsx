import Image from 'next/image';
import styles from './styles.module.scss'

export default function CardHorario(props) {
    const myLoader=({src})=>{
        return src;
    }
        return (
        <div className={styles.cardHorario}>
            <div className={styles.horario}>
                <Image
                    className={styles.imagemRelogio}
                    src="/src/images/Horario.svg"
                    alt="Foto"
                    width='20'
                    height='20'
                />
                <p>{props.horario}</p>
            </div>
            <div className={styles.fotoENome}>
                <div className={styles.divFotoCardHorario}>
                    <Image
                        className={styles.fotoCardHorario}
                        loader={myLoader}
                        src={props.foto}
                        alt="Foto"
                        width='56'
                        height='56'

                    />
                </div>
                <p>{props.nome}</p>
            </div>

        </div>
    );
}