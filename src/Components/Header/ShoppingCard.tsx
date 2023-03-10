import { AiOutlineShoppingCart } from 'react-icons/ai';

import styles from './Header.module.css';

export function ShoppingCard({ ...props }) {
    return (
        <div className={styles.shoppingCard} {...props}>
            <AiOutlineShoppingCart />
            <span className={styles.shoppingCardBadge}>3</span>
        </div>
    )
}
