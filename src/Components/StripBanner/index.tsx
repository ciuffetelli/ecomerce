import styles from './StripBanner.module.css'

import { TbTruckDelivery } from 'react-icons/tb'
import { FaHandsHelping, FaHotjar } from 'react-icons/fa'
import { SiTrustpilot } from 'react-icons/si'

export function StripBanner() {
    return (
        <section className={styles.container}>
            <div className={styles.item}>
                <TbTruckDelivery className={styles.icon} />
                <div className={styles.text}>
                    <h3>Free Shipping</h3>
                    <small>On all orders over $100</small>
                </div>
            </div>
            <div className={styles.item}>
                <FaHandsHelping className={styles.icon} />
                <div className={styles.text}>
                    <h3>Suport 24/7</h3>
                    <small>Call us anytime</small>
                </div>
            </div>
            <div className={styles.item}>
                <SiTrustpilot className={styles.icon} />
                <div className={styles.text}>
                    <h3>100% Safety</h3>
                    <small>
                        <SiTrustpilot />
                        <SiTrustpilot />
                        <SiTrustpilot />
                        <SiTrustpilot />
                        <SiTrustpilot />
                        &#160;At Trustpilot
                    </small>
                </div>
            </div>
            <div className={styles.item}>
                <FaHotjar className={styles.icon} />
                <div className={styles.text}>
                    <h3>Hot Deals</h3>
                    <small>Up to 90% off</small>
                </div>
            </div>
        </section>
    )
}