import Link from "next/link";
import Image from "next/image";

import { MenuType, MenuTypeTypes } from "./@types";

import stylesMainMenu from './Menu.module.css';
import stylesSideMenu from './SideMenu.module.css';

import { FaChevronDown } from 'react-icons/fa';

type BuilderProps = {
    mainMenu?: boolean,
    data?: MenuType
}
export function Builder(props: BuilderProps) {

    const isMainMenu = props.mainMenu === undefined ? true : props.mainMenu;
    const styles = isMainMenu ? stylesMainMenu : stylesSideMenu;
    const parentType = isMainMenu ? "main" : "side";

    return (
        <ul className={styles.menu}>
            {recursiveMenuMap(styles, props.data, parentType)}
        </ul>
    )
}

export const recursiveMenuMap = (styles: any, menu?: MenuType, level?: string) => {

    if (!menu) return <></>;

    return Object.keys(menu).map((key, index) => {

        const href = menu[key].href;
        const image = menu[key].image;
        const newLevel = level ? `${level}-${key}` : key;
        const type: MenuTypeTypes = menu[key].type ?? 'dropdown';
        
        const children = menu[key].children;
    
        (children !== undefined) && (Object.keys(children).map(key => {
            if(children[key].type) return;
            children[key].type = type;
        }))
        
        const TitleContructor = (props: {
            href?: string
            content: JSX.Element
        }): JSX.Element => {               
            return href ? (
                <Link href={href} className={styles.menuItemTitle}>
                    {props.content}
                </Link>
            ) : (
                <h3 className={styles.menuItemTitle} onClick={() => handleMenuItemClick(key, newLevel)}>
                    {props.content}
                </h3>
            )
        }
        
        return (
            <li key={index} className={styles.menuItemHead} data-parent={newLevel} data-toggle={false}>

                <TitleContructor href={href} content={(
                    <>
                        {type === "images" && image && (
                            <div className={styles.menuItemImage}>
                                <Image src={image} alt={key} fill />
                            </div>
                        )}

                        {sanitizeMenuTitle(key)}
                        {children && <FaChevronDown />}
                    </>
                )} />
                {children && (
                    <div className={styles.menuItemChildrenContainer}>
                        <ul className={styles.menuItemChildren} data-type={type}>
                            {recursiveMenuMap(styles, children, newLevel)}
                        </ul>
                    </div>
                )}
            </li>                
        )
    })
}

export const handleMenuItemClick = (key: string, level: string) => {

    document.querySelectorAll(`[data-parent]`).forEach((element) => {

        const liElement = element as HTMLUListElement;

        if(level.search(liElement.dataset.parent as string) === 0) return;

        liElement.dataset.toggle = "false";
    })

    const element = document.querySelector(`[data-parent="${level}"]`) as HTMLUListElement;
    
    element.dataset.toggle = element.dataset.toggle !== "true" ? "true" : "false";
}

function sanitizeMenuTitle(title: string) {
    (title.length > 25) && (title = title.slice(0, 25) + '...');
    return title.replaceAll('_', ' ');
}