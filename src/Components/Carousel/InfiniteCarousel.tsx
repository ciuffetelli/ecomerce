import { useEffect, useRef, useState } from 'react'
import styles from './Carousel.module.css'

import { FaChevronCircleUp } from 'react-icons/fa';

type InfiniteCarouselProps = {
    data?: HTMLElement | HTMLElement[] | Element | Element[]
    children?: HTMLElement | HTMLElement[] | Element | Element[]
    minSlides?: number
    className?: string
    autoDirection?: 'left' | 'right'
    interval?: number
}
export function InfiniteCarousel(props: InfiniteCarouselProps) {

    const [hover, setHover] = useState(false);
    const [maxWidth, setMaxWidth] = useState(0);
    const [childrenInitialPosition, setChildrenInitialPosition] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);

    const children = props.children ?
            (Array.isArray(props.children) ? props.children : [props.children]) :
            (props.data ? props.data : []);

    const arrChildren = Array.from(children as HTMLElement[]);

    const multipliedChildren = arrChildren.concat(arrChildren).concat(arrChildren);

    const calculateNewChildRelocation = (action: 1 | -1, key: string | null, position: string | null) => {

        if(!key || !position) return {
            relocate: 0,
            newPosition: 0
        };

        const intKey = parseInt(key);
        const intPosition = parseInt(position);

        const initialPosition = childrenInitialPosition[intKey];

        const newPosition = (intPosition + action) < 0 ? (multipliedChildren.length -1) : 
        (intPosition + action) > (multipliedChildren.length -1) ? 0 : intPosition + action;

        const finalPosition = childrenInitialPosition[newPosition];

        const relocate = finalPosition - initialPosition - maxWidth;

        return {
            relocate,
            newPosition
        };
    }

    const move = (child: HTMLElement, relocate: {relocate: number, newPosition: number}) => {

        child.setAttribute('data-infinite-position', relocate.newPosition.toString());

        child.style.transform = `translateX(${relocate.relocate}px)`;
        child.style.opacity = (relocate.newPosition == 0 || relocate.newPosition == multipliedChildren.length -1) ? '0' : '1';
    }

    const moveToLeft = (isAuto?: boolean) => {

        if(isAuto && hover) return;

        const children = Array.from<HTMLElement>(document.querySelectorAll('[data-infinite-child]'));

        children.map(child => {
            const relocate = calculateNewChildRelocation(-1, child.getAttribute('data-infinite-child'), child.getAttribute('data-infinite-position'));
            move(child, relocate)
        });
    }

    const moveToRight = (isAuto?: boolean) => {

        if(isAuto && hover) return;

        const children = Array.from<HTMLElement>(document.querySelectorAll('[data-infinite-child]'));

        children.map(child => {
            const relocate = calculateNewChildRelocation(1, child.getAttribute('data-infinite-child'), child.getAttribute('data-infinite-position'));
            move(child, relocate)
        });
    }    

    const handlePreviusClick = () => {
        moveToLeft();
    };

    const handleNextClick = () => {
        moveToRight();
    };

    useEffect(() => {

        const children = Array.from<HTMLElement>(document.querySelectorAll('[data-infinite-child]'));

        children.map(child => {
            child.style.transform = `translateX(${-maxWidth}px)`;
        });

        setChildrenInitialPosition(() => (children.reduce<number[]>((state, child) => {
            const childId = child.getAttribute('data-infinite-child') ?? 0;
            state[childId as number] = child.getBoundingClientRect().left;
            return state;
        }, []).sort((a, b) => a - b)));      
    }, [maxWidth]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(!props.autoDirection || props.autoDirection === 'left') {
                moveToLeft(true);
            } else if(props.autoDirection === 'right') {
                moveToRight(true);
            }
        }, props.interval ?? 2000);

        return () => clearInterval(interval);          
    }, [maxWidth, hover]);

    useEffect(() => {

        if(arrChildren.length < 1) return;

        const children = Array.from<HTMLElement>(document.querySelectorAll('[data-infinite-child]'));

        const maxWidth = children.reduce((state, child) => {
            return child.getBoundingClientRect().width + state;
        }, 0) / 3;

        setMaxWidth(() => maxWidth > window.innerWidth ? window.innerWidth : maxWidth);

        containerRef.current?.addEventListener('mouseover', () => setHover(true));
        containerRef.current?.addEventListener('mouseleave', () => setHover(false));
    }, [])

    return (
        <div ref={containerRef} className={`${styles.container} ${styles.infiniteContainer}`} style={{maxWidth: maxWidth}}>
            <div className={`${styles.controls} ${styles.controlLeft}`} onClick={handlePreviusClick}><FaChevronCircleUp style={{transform: 'rotate(-90deg)'}} /></div>
            <div className={styles.infiniteContent}>{multipliedChildren.map((child, index) => {
                return <div key={index} className={styles.infinitContentChild} data-infinite-child={index} data-infinite-position={index}>{ child as any }</div>
            })}</div>
            <div className={`${styles.controls} ${styles.controlRight}`} onClick={handleNextClick}><FaChevronCircleUp style={{transform: 'rotate(90deg)'}} /></div>
        </div>
    )
}