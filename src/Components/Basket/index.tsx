import { ForwardedRef, useImperativeHandle, useState } from "react"
import Image from "next/image";

import styles from "./Basket.module.css"

import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';

import { Basket as BasketType } from '@/Components/Basket/@types';

export type BasketElement = {
    show: () => void
}

type BasketProps = {
    data: BasketType
    forwardRef?: ForwardedRef<BasketElement>
}
export function Basket(props: BasketProps) {

    const [show, setShow] = useState(false);
    const [displayAnimate, setDisplayAnimate] = useState(false);

    const basketTotal = props.data.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    const basketVAT = props.data.items.reduce((total, item) => {
        return total + ((item.price * item.quantity) * 0.2);
    }, 0);

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
                    <div className={styles.basketList}>
                        
                        { props.data.items.map((item, key) => (
                            <div key={key} className={styles.basketItem}>
                                <div className={styles.basketItemImg}>
                                    {
                                        item.image ?
                                            <Image src={item.image} alt="product description" fill />
                                        : 
                                            <Image src="/Product_Images_Coming_Soon.webp" alt="product description" fill />
                                    }
                                </div>
                                <div className={styles.basketItemInfo}>
                                    <div className={styles.basketItemName}>
                                        <strong>{ sanitizeProductTitle(item.title) }</strong>
                                    </div>
                                    <div className={styles.basketItemPrice}>£ { item.price.toFixed(2) }</div>
                                </div>
                                <div className={styles.basketItemQuantity}>{ item.quantity }</div>
                                <div className={styles.basketItemRemove}><AiOutlineDelete /></div>
                            </div>
                        ))}

                    </div>
                    <div className={styles.basketResume}>
                        <div className={styles.basketResumeItem}>
                            Subtotal:
                            <span>£ { (Math.round(basketTotal * 100) / 100).toFixed(2) }</span>
                        </div>
                        <div className={styles.basketResumeItem}>
                            VAT:
                            <span>£ { (Math.round(basketVAT * 100) / 100).toFixed(2) }</span>
                        </div>
                        <div className={styles.basketResumeItem}>
                            Discount:
                            <span>£ { (Math.round(0 * 100) / 100).toFixed(2) }</span>
                        </div>
                        <div className={styles.basketResumeTotal}>
                            Total:
                            <span>£ { Math.round((basketTotal + basketVAT) * 100) / 100 }</span>
                        </div>                    
                    </div>
                    <div className={styles.basketAction}>
                        <div className={styles.basketActionButton}>View Basket</div>
                        <div className={styles.basketActionButton}>Checkout</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function sanitizeProductTitle(title: string) {
    (title.length > 25) && (title = title.slice(0, 25) + '...');
    return title.replaceAll('_', ' ');
}