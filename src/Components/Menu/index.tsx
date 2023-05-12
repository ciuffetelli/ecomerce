import { useEffect, useState } from 'react';

import { useApp } from '@/hooks/useApp';

import { MenuItem, MenuType } from './@types';

import { MenuDropdown } from './MenuDropdown';
import { MenuCategory } from './MenuCategory';
import { Button } from '@/Components/Button';

import { BsChevronDown } from 'react-icons/bs';
import { maxLeft } from '@/helpers/maxLeft';

export function Menu() {

    const app = useApp();

    console.log('app', app);

    const data = app.menu;

    const closeAllSubmenus = () => {
        document.querySelectorAll('[data-element="menu"] [data-submenu].animate-slide-down').forEach((element) => {
            element.classList.remove('animate-slide-down');
        })        
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    }

    const handleMenuItemClick = (index: number) => {

        const submenuElement = document.querySelector<HTMLElement>('[data-element="menu"] [data-submenu="' + index + '"]');

        console.log(maxLeft(submenuElement));

        if(submenuElement && maxLeft(submenuElement) < 0) {
            submenuElement.style.transform = 'translate(' + (maxLeft(submenuElement) - 5) + 'px, 100%)';
        }

        if(submenuElement?.classList.contains('animate-slide-down')) {
            closeAllSubmenus();
            return;
        }

        closeAllSubmenus();

        document.querySelector('[data-element="menu"] [data-submenu="' + index + '"]')?.classList.add('animate-slide-down');
    }

    useEffect(() => {
        if(typeof window === 'undefined') return;
    
        document.addEventListener('click', (event) => closeAllSubmenus());
    }, [])

    return (
        <div className="m-auto p-2 pb-0 overflow-hidden" data-element="menu" onClick={handleMenuClick}>
            <ul className='flex gap-4'>
                { data.map((item, index) => {
                    return (
                        <li key={index} className={`flex ${item.type === 'loading' && app.status !== 'idle' ? 'w-32 h-8 bg-slate-400 animate-pulse rounded-xl' : ''}`}>
                            <Button title={item.title} Icon={item.children && item.children?.length > 0 ? BsChevronDown : undefined} action={item.children && item.children.length > 0 ? () => handleMenuItemClick(index) : item.url ?? ''} className='border-none flex-row-reverse' />

                            {item.children && item.children.length > 0 && (
                                <SubMenu data={item.children} type={item.type} index={index} />
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

function SubMenu(props: { data: MenuItem[], index: number, type?: MenuType}) {
    switch(props.type) {
        case 'dropdown': return <MenuDropdown data={props.data} index={props.index} />
        case 'category': return <MenuCategory data={props.data} index={props.index} />
    }

    return <></>
}