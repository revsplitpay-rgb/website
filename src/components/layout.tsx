import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CTA from './sections/shared/cta'
import Footer from './sections/shared/footer'
import Navbar from './sections/shared/navbar'
import HomeNavbar from './sections/home/home-navbar'
import HomeCTA from './sections/home/home-cta'
import HomeFooter from './sections/home/home-footer'
import { MinimalNavbar, MinimalFooter } from './sections/shared/minimal-chrome'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

const Layout = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'home' | 'minimal' }) => {
    const isHome = variant === 'home'
    const isMinimal = variant === 'minimal'
    return (
        <main className="brand-site-shell">
            <ScrollToTop />
            {isHome ? <HomeNavbar /> : isMinimal ? <MinimalNavbar /> : <Navbar />}
            {children}
            {isHome ? <HomeCTA /> : isMinimal ? null : <CTA />}
            {isHome ? <HomeFooter /> : isMinimal ? <MinimalFooter /> : <Footer />}
        </main>
    )
}

export default Layout
