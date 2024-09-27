import links from '@/public/icon-links-header.svg'
import profile from '@/public/icon-profile-details-header.svg'

interface NavItem {
    label: string,
    href: string,
    icon: string
}

export const navItems: NavItem[] = [
    {
        label: 'Links',
        href: '/',
        icon: links
    },
    {
        label: 'Profile Details',
        href: '/',
        icon: profile
    }
]