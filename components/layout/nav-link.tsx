import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

type PropsType = {
    href?: string;
    children: ReactNode;
    type: 'Button' | 'MenuItem';
    onClick?: () => void;
    'data-test'?: string;
}
const NavLink:FC<PropsType> = ({href, children, type, ...rest}) => {
    let activeNavProps = {};

    const { asPath } = useRouter();

    if(href) {
        const activePathname = new URL(asPath, location.href).pathname;
        const linkPathname = new URL( href, location.href).pathname

        if(activePathname === linkPathname) {
            activeNavProps = {
                className: 'active',
                'data-active': 'true',
                 style: {backgroundColor: 'hsl(219deg 72% 62%)'}
            };
        }
    }
   

    if(type === 'MenuItem') {
        return (
            href ? (
                <MenuItem {...activeNavProps} {...rest}>
                    <Link href={href} passHref>
                        <Typography textAlign="center">
                            {children}
                        </Typography>
                    </Link>
                </MenuItem>
            ): 
            (
                <MenuItem {...activeNavProps} {...rest}>
                    <Typography textAlign="center">
                        {children}
                    </Typography>
                </MenuItem>
            )

        );
    }else {
        return  (
            href ? (
                <Link href={href} passHref>
                    <Button sx={{ my: 2, color: "white", display: "block" }} {...activeNavProps} {...rest}>
                        {children}
                    </Button>
                </Link>
            ): (
                <Button sx={{ my: 2, color: "white", display: "block" }} {...activeNavProps} {...rest}>
                    {children}
                </Button>
            )

        )

    }

}

export default NavLink;