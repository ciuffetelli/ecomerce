import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import { useApp } from '@/hooks/useApp';

import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu, AiOutlineUser, AiOutlineShopping } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';
import { ShoppingCard } from './ShoppingCard';

import { Image } from '@/Components/Image'
import { Basket, BasketElement } from '@/Components/Basket';
import { Menu } from '@/Components/Menu';
import { SideMenu, SideMenuElement } from '@/Components/Menu/SideMenu';
import { ButtonDark } from '@/Components/ButtonDark';
import { Button } from '@/Components/Button';

export function Header() {

    const [showSearch, setShowSearch] = useState<boolean | number>(-1);
    const [searchValue, setSearchValue] = useState('');

    const app = useApp();

    const aiOutlineSearchRef = useRef<HTMLSpanElement>(null);
    const aiOutlineCloseRef = useRef<HTMLSpanElement>(null);
    const mobileSearchContainerRef = useRef<HTMLDivElement>(null);
    const basketRef = useRef<BasketElement>(null);
    const sideMenuRef = useRef<SideMenuElement>(null);

    const handleShowSeachClick = () => {
        setShowSearch(showSearch => showSearch == -1 || !showSearch ? true : false);
    }
    const handleSeach = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
    const handleLoginButtonClick = () => {
    }
    const handleShoppingCardClick = () => {
        basketRef.current?.show();
    }
    const handleSideMenuClick = () => {
        sideMenuRef.current?.show();
    }

    useEffect(() => {
        if(showSearch === -1) return;

        (aiOutlineCloseRef.current?.classList.contains('hidden')) && aiOutlineCloseRef.current?.classList.remove('hidden');

        if(showSearch) {
            aiOutlineSearchRef.current?.classList.add('animate-disappear');
            aiOutlineSearchRef.current?.classList.remove('animate-appear');

            aiOutlineCloseRef.current?.classList.add('animate-appear');
            aiOutlineCloseRef.current?.classList.remove('animate-disappear');

            mobileSearchContainerRef.current?.classList.add('animate-slide-down');
        } else {
            aiOutlineSearchRef.current?.classList.add('animate-appear');
            aiOutlineSearchRef.current?.classList.remove('animate-disappear');

            aiOutlineCloseRef.current?.classList.add('animate-disappear');
            aiOutlineCloseRef.current?.classList.remove('animate-appear');

            mobileSearchContainerRef.current?.classList.remove('animate-slide-down');
        }
    }, [showSearch])
    return (
        <>
        <header className="flex fixed top-4 z-50 w-screen pl-4 pr-4 justify-center">
            <div className="flex flex-1 flex-col max-w-6xl bg-neutral-100 dark:bg-slate-700 text-slate-600 dark:text-neutral-50/90 border border-slate-600/10 dark:border-slate-500 shadow-lg rounded-xl">
                <div className="flex justify-between items-center p-4">
                    <div className="relative md:hidden lg:flex w-12 md:w-auto">
                        <Link href="/">
                            <Image src="/NextEcomerceLogo.svg" alt="Next Ecomerce Logo" priority={true} />                        
                        </Link>
                    </div>
                    <div className="flex gap-2 text-xl md:hidden">
                        <Button action={searchValue.length > 0 ? `/search/${searchValue}` : handleShowSeachClick} Icon={AiOutlineSearch} className={`text-sm ${searchValue.length > 0 && 'border-slate-600'}`} />
                        { app.favorites.length > 0 && <Button action='/favorites' Icon={MdFavoriteBorder} className='text-sm' /> }
                        <ShoppingCard onClick={handleShoppingCardClick} className='text-sm' />
                        <Button action={handleSideMenuClick} Icon={AiOutlineMenu} className='text-sm' />
                    </div>
                    <div className="relative hidden md:flex flex-1 flex-col h-full">
                        <div className="flex justify-evenly items-center">
                            <div className='hidden w-16 md:flex lg:hidden'>
                                <Link href="/">
                                    <Image src="/NextEcomerceLogo.svg" alt="Next Ecomerce Logo" priority={true} />                        
                                </Link>                                
                            </div>
                            <div className="flex flex-1 max-w-sm p-2 pl-4 m-auto border border-slate-600/10 dark:border-slate-500 rounded-xl">
                                <input type="search" className='flex-1 bg-transparent' value={searchValue} onChange={handleSeach} placeholder='Search' autoComplete='false' />
                                <Button action={`/search/${searchValue}`} Icon={AiOutlineSearch} />
                            </div>
                            <div className='hidden md:flex lg:hidden gap-2'>
                                <Button action={handleLoginButtonClick} Icon={AiOutlineUser} className='h-8' />
                                <ShoppingCard onClick={handleShoppingCardClick} className='h-8'/>
                            </div>
                        </div>
                        <Menu />
                    </div>
                    <div className='hidden lg:flex flex-col gap-2'>
                        
                        <ButtonDark className="ml-auto" />

                        <div className='flex gap-2'>
                            <Button action="/login" Icon={AiOutlineUser} className='text-3xl' />
                            <ShoppingCard onClick={handleShoppingCardClick} className='text-3xl'/>
                        </div>
                    </div>
                </div>
                <div ref={mobileSearchContainerRef} className="md:hidden animate-slide-up">
                    <div className='flex p-2 border-t border-slate-600/10 dark:border-slate-500'>
                        <input type="search" className='flex-1 bg-transparent' value={searchValue} onChange={handleSeach} placeholder="Search" autoComplete='false' />
                    </div>
                </div>
            </div>
        </header>
        <Basket forwardRef={basketRef} />
        <SideMenu forwardRef={sideMenuRef} />
        </>
    )
}