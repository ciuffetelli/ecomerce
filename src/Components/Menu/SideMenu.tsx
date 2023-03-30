import { ForwardedRef, useImperativeHandle, useState } from "react"

import styles from "./SideMenu.module.css"

import { AiOutlineClose } from 'react-icons/ai';

import { Image } from '@/Components/Image'
import { Builder } from "./helpers";
import { MenuType } from "./@types";

export type SideMenuElement = {
    show: () => void
}

type SideMenuProps = {
    forwardRef?: ForwardedRef<SideMenuElement>
    data: MenuType
}
export function SideMenu(props: SideMenuProps) {

    const [show, setShow] = useState(false);
    const [displayAnimate, setDisplayAnimate] = useState(false);

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }

    const handleShow = () => {
        setShow(true)
        setTimeout(() => setDisplayAnimate(true), 100)
    }

    const handleHide = () => {
        setDisplayAnimate(false)
        setTimeout(() => setShow(false), 250)
    }

    useImperativeHandle(props.forwardRef, () => ({
        show: () => handleShow(),
    }))
    return (
        <div className={styles.container} onClick={handleHide} style={{
            display: show ? "flex" : "none",
        }}>
            <div className={styles.background} style={{
            opacity: displayAnimate ? 1 : 0
        }}>
                <div className={styles.content} onClick={handleContentClick} style={{
                    transform: displayAnimate ? "translateX(0)" : "translateX(100%)"
                }}>
                    <div className={styles.buttonClose} onClick={handleHide}>
                        <AiOutlineClose />
                    </div>

                    <div className={styles.logo}>
                        <Image src="/NextEcomerceLogo.svg" alt="Next Ecomerce Logo" priority={true} fill />
                    </div>

                    <div className={styles.menuContainer}>
                        <Builder mainMenu={false} data={props.data} />
                    </div>

                    <div className={styles.user}>
                        <div className={styles.login}>
                            <h2>Login</h2>
                            <input className={styles.loginInput} placeholder="your_name@company.com" />
                            <input type="password" className={styles.loginInput} placeholder="password" />
                            <div className={styles.loginButton}>Login</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}