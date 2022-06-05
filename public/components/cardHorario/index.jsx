import Image from 'next/image';
import styles from './styles.module.scss'

export default function CardHorario(props) {
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
                        src="/src/images/Foto.jpg"
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