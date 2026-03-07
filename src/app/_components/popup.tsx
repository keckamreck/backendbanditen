import styles from "./popup.module.css";
import React, {FormEvent} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'


export default function PopupWithInput({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {



    console.log("PopupWithInput Pressed!");


    if (!isOpen) return null;

    return (

        <div className={styles.overlay}>
            <div className={styles.container}>
                <button className={styles.closeBtn} onClick={onClose} type="button">
                    {/*<FontAwesomeIcon icon={faCircleXmark} />*/}
                    X
                </button>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <section>
                        <input id="createList" type="text" placeholder="Name..." />
                        <input type="submit" value="Erstellen" />
                    </section>
                </form>
            </div>
        </div>

    );

    function handleSubmit(e: FormEvent) {
        console.log("handleSubmit");
        e.preventDefault()

        onClose();

    }



}



