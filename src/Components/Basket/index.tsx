import { ForwardedRef, useImperativeHandle, useState } from "react"
import Image from "next/image";

import styles from "./Basket.module.css"

import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';

export type BasketElement = {
    show: () => void
}

type BasketProps = {
    forwardRef?: ForwardedRef<BasketElement>
}
export function Basket(props: BasketProps) {

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
                    <div className={styles.basketList}>
                        <div className={styles.basketItem}>
                            <div className={styles.basketItemImg}>
                                <Image src="/Product_Images_Coming_Soon.webp" alt="product description" fill />
                            </div>
                            <div className={styles.basketItemInfo}>
                                <div className={styles.basketItemName}>
                                    <strong>Name qwidjwqoidjqwoidj djwqoidj</strong>
                                </div>
                                <div className={styles.basketItemPrice}>Price</div>
                            </div>
                            <div className={styles.basketItemQuantity}>35</div>
                            <div className={styles.basketItemRemove}><AiOutlineDelete /></div>
                        </div>

                        
                        <div className={styles.basketItem}>
                            <div className={styles.basketItemImg}>
                                <Image src="/Product_Images_Coming_Soon.webp" alt="product description" fill />
                            </div>
                            <div className={styles.basketItemInfo}>
                                <div className={styles.basketItemName}>
                                    <strong>Name qwidjwqoidjqwoidj djwqoidj</strong>
                                </div>
                                <div className={styles.basketItemPrice}>Price</div>
                            </div>
                            <div className={styles.basketItemQuantity}>35</div>
                            <div className={styles.basketItemRemove}><AiOutlineDelete /></div>
                        </div>

                        <div className={styles.basketItem}>
                            <div className={styles.basketItemImg}>
                                <Image src="/Product_Images_Coming_Soon.webp" alt="product description" fill />
                            </div>
                            <div className={styles.basketItemInfo}>
                                <div className={styles.basketItemName}>
                                    <strong>Name qwidjwqoidjqwoidj djwqoidj</strong>
                                </div>
                                <div className={styles.basketItemPrice}>Price</div>
                            </div>
                            <div className={styles.basketItemQuantity}>35</div>
                            <div className={styles.basketItemRemove}><AiOutlineDelete /></div>
                        </div>

                        <div className={styles.basketItem}>
                            <div className={styles.basketItemImg}>
                                <Image src="/Product_Images_Coming_Soon.webp" alt="product description" fill />
                            </div>
                            <div className={styles.basketItemInfo}>
                                <div className={styles.basketItemName}>
                                    <strong>Name qwidjwqoidjqwoidj djwqoidj</strong>
                                </div>
                                <div className={styles.basketItemPrice}>Price</div>
                            </div>
                            <div className={styles.basketItemQuantity}>35</div>
                            <div className={styles.basketItemRemove}><AiOutlineDelete /></div>
                        </div>

                        <div className={styles.basketItem}>
                            <div className={styles.basketItemImg}>
                                <Image src="/Product_Images_Coming_Soon.webp" alt="product description" fill />
                            </div>
                            <div className={styles.basketItemInfo}>
                                <div className={styles.basketItemName}>
                                    <strong>Name qwidjwqoidjqwoidj djwqoidj</strong>
                                </div>
                                <div className={styles.basketItemPrice}>Price</div>
                            </div>
                            <div className={styles.basketItemQuantity}>35</div>
                            <div className={styles.basketItemRemove}><AiOutlineDelete /></div>
                        </div>

                        <div className={styles.basketItem}>
                            <div className={styles.basketItemImg}>
                                <Image src="/Product_Images_Coming_Soon.webp" alt="product description" fill />
                            </div>
                            <div className={styles.basketItemInfo}>
                                <div className={styles.basketItemName}>
                                    <strong>Name qwidjwqoidjqwoidj djwqoidj</strong>
                                </div>
                                <div className={styles.basketItemPrice}>Price</div>
                            </div>
                            <div className={styles.basketItemQuantity}>35</div>
                            <div className={styles.basketItemRemove}><AiOutlineDelete /></div>
                        </div>


                    </div>
                    <div className={styles.basketResume}>
                        <div className={styles.basketResumeItem}>
                            Subtotal:
                            <span>£ 0.00</span>
                        </div>
                        <div className={styles.basketResumeItem}>
                            VAT:
                            <span>£ 0.00</span>
                        </div>
                        <div className={styles.basketResumeItem}>
                            Discount:
                            <span>£ 0.00</span>
                        </div>
                        <div className={styles.basketResumeTotal}>
                            Total:
                            <span>£ 0.00</span>
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