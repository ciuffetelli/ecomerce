import { ForwardedRef, useImperativeHandle, useState } from "react"
import Image from "next/image";

import styles from "./SideMenu.module.css"

import { AiOutlineClose } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import Link from "next/link";

export type SideMenuElement = {
    show: () => void
}

type menuType = {
    [key: string]: {
        href?: string
        children?: menuType
    }
}

type SideMenuProps = {
    forwardRef?: ForwardedRef<SideMenuElement>
}
export function SideMenu(props: SideMenuProps) {

    const [show, setShow] = useState(false);
    const [displayAnimate, setDisplayAnimate] = useState(false);

    const menu = {
        Home: {
            children: {
                Category: {
                    children: {
                        Category1: {
                            href: "/category/1"
                        },
                        Category2: {
                            href: "/category/2"
                        },
                    }
                },
                Category2: {
                    href: "/category/2"
                },
            }
        },
        Shop: {
            href: "/shop"
        },
        Pages: {
            children: {
                About: {
                    href: "/about"
                },
                Contact: {
                    href: "/contact"
                }
            }
        },
        Blog: {
            href: "/blog"
        }
    }
    
    const recursiveMenuMap = (menu?: menuType, level?: string) => {

        if (!menu) return <></>;

        return Object.keys(menu).map((key, index) => {

            const children = menu[key].children;
            const href = menu[key].href;
            const newLevel = level ? `${level}-${key}` : key;

            const TitleContructor = (props: {
                href?: string
                content: JSX.Element
            }): JSX.Element => {               
                return href ? (
                    <Link href={href} className={styles.menuItemTitle}>
                        {props.content}
                    </Link>
                ) : (
                    <div className={styles.menuItemTitle} onClick={() => handleMenuItemClick(key, newLevel)}>
                        {props.content}
                    </div>
                )
            }
            
            return (
                <li key={index} className={styles.menuItemHead} data-parent={newLevel} data-toggle={false}>

                    <TitleContructor href={href} content={(
                        <>
                            {key}
                            {children && <FaChevronDown />}
                        </>
                    )} />
                    {children && (
                        <ul className={styles.menuItemChildren}>
                            {recursiveMenuMap(children, newLevel)}
                        </ul>
                    )}
                </li>                
            )
        })
    }

    const handleMenuItemClick = (key: string, level: string) => {

        const element = document.querySelector(`[data-parent="${level}"]`) as HTMLUListElement;

        if (!element) return;

        element.dataset.toggle = element.dataset.toggle !== "true" ? "true" : "false";
    }

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

                    <div className={styles.menu}>
                        <ul>
                            {recursiveMenuMap(menu)}
                        </ul>
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