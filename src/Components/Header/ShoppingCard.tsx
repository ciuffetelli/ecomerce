import { AiOutlineShoppingCart } from 'react-icons/ai';

import styles from './Header.module.css';

type ShoppingCardProps = {
    badge?: number
    onClick?: () => void
}
export function ShoppingCard(props: ShoppingCardProps) {
    return (
        <div className={styles.shoppingCard} {...props}>
            <AiOutlineShoppingCart />
            { props.badge && props.badge > 0 && <span className={styles.shoppingCardBadge}>{ props.badge }</span> }
        </div>
    )
}
