import styles from './BackToTop.module.css'

import { FaChevronCircleUp } from 'react-icons/fa';

export function BackToTop() {
    return (
        <div className={styles.container}>
            <FaChevronCircleUp />
        </div>
    )
}