import styles from "./popup.module.css";
import React, {FormEvent} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import { faCircleXmark } from '@awesome.me/kit-KIT_CODE/icons'


export default function PopupWithInput({ isOpen, onClose, onSubmitting}: { isOpen: boolean; onClose: () => void; onSubmitting?: (name: string) => void }) {

    console.log("PopupWithInput Pressed!");

    if (!isOpen) return null;

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const input = document.getElementById("createList") as HTMLInputElement;
        if (input && input.value.trim()) {
            console.log("Form submitted with name:", input.value);
            if (onSubmitting) {
                onSubmitting(input.value.trim());
            }
            input.value = '';
        } else {
            alert("Bitte geben Sie einen Namen ein!");
        }

        onClose();
    }

    return (

        <div className={styles.overlay}>
            <div className={styles.container}>
                <button className={styles.closeBtn} onClick={onClose} type="button">
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <label id="createList-label" htmlFor="form">Neue Liste</label>
                <form id="form" className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <section>
                        <input id="createList" type="text" placeholder="Name..."  />
                        <input type="submit" value="Erstellen" />
                    </section>
                </form>
            </div>
        </div>

    );

}



