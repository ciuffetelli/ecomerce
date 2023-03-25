import { useEffect, useState } from 'react'
import styles from './Carousel.module.css'

import { FaChevronCircleUp } from 'react-icons/fa';

type CarouselProps = {
    data: JSX.Element[]
    className?: string
}
export function Carousel(props: CarouselProps) {

    const [active, setActive] = useState(0);
    const [hover, setHover] = useState(false);

    const setActivePreviousSlide = () => {
        setActive(active => (--active < 0 ? props.data.length -1 : active));
    }    

    const setActiveNextSlide = (isAuto: boolean) => {
        if (hover && isAuto) return;
        setActive((active + 1) % props.data.length);
    }

    const handlePreviusClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setActivePreviousSlide();
    }

    const handleNextClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setActiveNextSlide(false);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setActiveNextSlide(true)
        }, 5000);

        return () => clearTimeout(timeout);
    }, [active, hover])

    useEffect(() => {
        document.querySelector('[data-component="carousel"]')?.addEventListener('mouseover', () => setHover(true))
        document.querySelector('[data-component="carousel"]')?.addEventListener('mouseleave', () => setHover(false))
    }, [])

    return (    
        <div data-component="carousel" data-hover={hover} className={`${styles.container} ${props.className ? props.className : ''}`}>
            <div className={`${styles.controls} ${styles.controlLeft}`} onClick={handlePreviusClick}><FaChevronCircleUp style={{transform: 'rotate(-90deg)'}} /></div>
            {props.data.map((item, index) => (
                <div key={index} className={`${styles.slide} ${(index === active ? styles.active : '')}`} data-item={index}>
                    {item}
                </div>
            ))}
            <div className={`${styles.controls} ${styles.controlRight}`} onClick={handleNextClick}><FaChevronCircleUp style={{transform: 'rotate(90deg)'}} /></div>
        </div>
    )
}