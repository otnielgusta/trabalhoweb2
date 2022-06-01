import styles from './styles.module.scss'

export default function BotaoLoginCadastro(props){
    return(
        <div>
            <button 
                className={styles.botao} 
                type="submit"
                onClick={props.onClick}
                >{props.texto}
                </button>

        </div>
    );
}