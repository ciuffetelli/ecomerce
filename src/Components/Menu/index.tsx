import styles from './Menu.module.css';

import { MenuType } from './@types';

import { Builder } from './helpers';
import { useState } from 'react';

type MenuProps = {
    data: MenuType
}
export function Menu(props: MenuProps) {

    const handleMenuClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    }

    useState(() => {
        if(typeof window === 'undefined') return;

        document.addEventListener('click', (event) => {
            document.querySelectorAll('[data-element="menu"] [data-toggle="true"]').forEach((element) => {
                element.setAttribute('data-toggle', 'false');
            })
        })
    })

    return (
        <div className={styles.container} data-element="menu" onClick={handleMenuClick}>
            <Builder data={props.data} />
        </div>
    )
}