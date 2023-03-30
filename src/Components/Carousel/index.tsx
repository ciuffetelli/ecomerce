import { useEffect, useState, Children } from 'react'
import styles from './Carousel.module.css'

import { FaChevronCircleUp } from 'react-icons/fa';

type CarouselProps = {
    data?: JSX.Element[]
    children?: JSX.Element | JSX.Element[]
    className?: string
}
export function Carousel(props: CarouselProps) {

    const [active, setActive] = useState(0);
    const [hover, setHover] = useState(false);

    const children = props.children ?
            (Array.isArray(props.children) ? props.children : [props.children]) :
            (props.data ? props.data : []);

    const setActivePreviousSlide = () => {
        setActive(active => (--active < 0 ? children.length -1 : active));
    }    

    const setActiveNextSlide = (isAuto: boolean) => {
        if (hover && isAuto) return;
        setActive((active + 1) % children.length);
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
            {children.map((item, index) => (
                <div key={index} className={`${styles.slide} ${(index === active ? styles.active : '')}`} data-item={index}>
                    {item}
                </div>
            ))}
            <div className={`${styles.controls} ${styles.controlRight}`} onClick={handleNextClick}><FaChevronCircleUp style={{transform: 'rotate(90deg)'}} /></div>
        </div>
    )
}