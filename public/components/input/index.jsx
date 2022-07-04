import Image from 'next/image';
import styles from './styles.module.scss';
import { useState} from 'react';

export default function InputComponent(props){
    const [value, setValue] = useState(props.value);

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
            <input 
                type={props.type ? props.type : 'text'}
                placeholder={props.texto}
                value={value}
                onChange={props.onChange}
                />
        </div>
);
}