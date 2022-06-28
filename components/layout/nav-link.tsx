import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

type PropsType = {
    href: string;
    children: ReactNode
}
const NavLink:FC<PropsType> = ({href, children}) => {
    const { asPath } = useRouter();
    console.log('asPath', asPath);
    const activePathname = new URL(asPath, location.href).pathname;
    const linkPathname = new URL( href, location.href).pathname
    const activeNave = activePathname === linkPathname ? {className: 'active', 'data-test': 'active-nav'} : {}

    return (
        <Link href={href} {...activeNave}>
            {children}
        </Link>
    )
}

export default NavLink;