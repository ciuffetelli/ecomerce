import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Header.module.css';

import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { ShoppingCard } from './ShoppingCard';
import { Basket, BasketElement } from '@/Components/Basket';
import { SideMenu, SideMenuElement } from '@/Components/SideMenu';

export function Header() {

    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const basketRef = useRef<BasketElement>(null);
    const sideMenuRef = useRef<SideMenuElement>(null);

    const handleShowSeachClick = () => {
        setShowSearch(!showSearch);
    }
    const handleSeach = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
    const handleShoppingCardClick = () => {
        basketRef.current?.show();
    }
    const handleSideMenuClick = () => {
        sideMenuRef.current?.show();
    }
    return (
        <>
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logoContainer}>
                        <Image src="/NextEcomerceLogo.svg" alt="Next Ecomerce Logo" priority={true} fill />
                    </div>
                    <div className={styles.action}>
                        <span onClick={handleShowSeachClick}>
                            { !showSearch ? <AiOutlineSearch /> : <AiOutlineClose />}
                        </span>
                        <ShoppingCard onClick={handleShoppingCardClick} />
                        <AiOutlineMenu onClick={handleSideMenuClick} />
                    </div>  
                </div>
                <div className={styles.searchContainer} style={{
                    height: showSearch ? '2.5rem' : '0',
                    opacity: showSearch ? '1' : '0',
                    backgroundColor: showSearch ? 'var(--primary)' : 'transparent',
                }}>
                    <input type="text" value={searchValue} onChange={handleSeach} placeholder="Search" autoComplete='false' />
                    <Link href={`/search/${searchValue}`}>
                        <AiOutlineSearch />
                    </Link>
                </div>
            </div>
        </header>
        <Basket forwardRef={basketRef} />
        <SideMenu forwardRef={sideMenuRef} />
        </>
    )
}