import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Button } from '../Button';

import { useApp } from '@/hooks/useApp';

type ShoppingCardProps = {
    onClick: () => void
    className?: string
}
export function ShoppingCard(props: ShoppingCardProps) {

    const app = useApp();

    const badge = app.basket.items.length ?? 0;

    return (
        <Button Icon={AiOutlineShoppingCart} action={props.onClick} className={`relative ${props.className ?? ''}`}>
            { badge > 0 && (
                <span className='absolute -top-2 -right-2 flex justify-center items-center w-5 h-5 bg-primary-100 text-white text-xs md:scale-125 rounded-full'>{badge > 999 ? 999 : badge}</span>
            ) }
        </Button>
    )
}
