import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { MenuType } from '../Menu/@types';

import styles from './Header.module.css';

import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu, AiOutlineUser, AiOutlineShopping } from 'react-icons/ai';
import { ShoppingCard } from './ShoppingCard';
import { Basket, BasketElement } from '@/Components/Basket';
import { Basket as BasketType } from '@/Components/Basket/@types';
import { Menu } from '@/Components/Menu';
import { SideMenu, SideMenuElement } from '@/Components/Menu/SideMenu';

type HeaderProps = {
    menuData: MenuType
    basketData: BasketType
}
export function Header(props: HeaderProps) {

    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const basketRef = useRef<BasketElement>(null);
    const sideMenuRef = useRef<SideMenuElement>(null);

    const basketTotal = props.basketData?.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

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
                    <div className={styles.actionMobile}>
                        <span onClick={handleShowSeachClick}>
                            { !showSearch ? <AiOutlineSearch /> : <AiOutlineClose />}
                        </span>
                        <ShoppingCard onClick={handleShoppingCardClick} badge={props.basketData?.items.length} />
                        <AiOutlineMenu onClick={handleSideMenuClick} />
                    </div>
                    <div className={styles.actionDesktop}>
                        <div className={styles.actionItems}>
                            <div className={styles.desktopSearchContainer}>
                                <input type="search" value={searchValue} onChange={handleSeach} placeholder='Search' autoComplete='false' />
                                <Link className={styles.searchButton} href={`/search/${searchValue}`}>
                                    <AiOutlineSearch />
                                </Link>                                
                            </div>
                            <div className={`${styles.actionsContainer} ${styles.actionLogin}`}>
                                <AiOutlineUser />
                                <span>Login</span>
                            </div>
                            <div className={styles.actionsContainer} onClick={handleShoppingCardClick}>
                                <AiOutlineShopping />
                                <span>£ { Math.round(basketTotal * 100) / 100 }</span>
                            </div>
                        </div>
                        <Menu data={props.menuData} />
                    </div>
                </div>
                <div className={styles.mobileSearchContainer} style={{
                    height: showSearch ? '2.5rem' : '0',
                    opacity: showSearch ? '1' : '0',
                    backgroundColor: showSearch ? 'var(--primary)' : 'transparent',
                }}>
                    <input type="search" value={searchValue} onChange={handleSeach} placeholder="Search" autoComplete='false' />
                    <Link href={`/search/${searchValue}`}>
                        <AiOutlineSearch />
                    </Link>
                </div>
            </div>
        </header>
        <Basket forwardRef={basketRef} data={props.basketData} />
        <SideMenu forwardRef={sideMenuRef} data={props.menuData} />
        </>
    )
}