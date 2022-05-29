import Image from 'next/image';
import styles from './styles.module.scss'

export default function InputComponent(props){
    return(
        <div className={styles.divInput}>
            <Image 
            className={styles.iconInput}
                src={'/src/images/'+props.imagem+'.png'}
                alt="Logo"
                width= '20'
                height= '18'
                srcset="" 

            />
            <input type="email" placeholder={props.texto}/>
        </div>
);
}