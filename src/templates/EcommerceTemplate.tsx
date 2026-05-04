import { ReactNode, useState, useEffect } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartUISafe } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { ScrollLink } from '@/components/ScrollLink'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
  hideFloatingCartOnMobile?: boolean
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default',
  hideFloatingCartOnMobile = false
}: EcommerceTemplateProps) => {
  const cartUI = useCartUISafe()
  const openCart = cartUI?.openCart ?? (() => {})
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const header = (
    <div className={`transition-all duration-500 ${scrolled ? 'py-3 bg-background/95 backdrop-blur shadow-sm' : 'py-4 bg-background'} ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo — centered on mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <BrandLogoLeft />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {!loadingCollections && hasCollections && (
              <ScrollLink
                to="/#collections"
                className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Colecciones
              </ScrollLink>
            )}
            <ScrollLink
              to="/#products"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Productos
            </ScrollLink>
            <Link
              to="/blog"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Revista
            </Link>
          </nav>

          {/* Right: Profile & Cart */}
          <div className="flex items-center space-x-1">
            <ProfileMenu />
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative text-foreground/80 hover:text-foreground hover:bg-secondary"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-[18px] w-[18px]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center"
                    style={{ color: 'hsl(var(--primary-foreground))' }}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-8">
            <h1 className="font-display text-3xl font-light text-foreground tracking-wide">{pageTitle}</h1>
            <div className="gold-divider mt-4 !mx-0" />
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 space-y-5">
          {!loadingCollections && hasCollections && (
            <ScrollLink
              to="/#collections"
              className="block font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Colecciones
            </ScrollLink>
          )}
          <ScrollLink
            to="/#products"
            className="block font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Productos
          </ScrollLink>
          <Link
            to="/blog"
            className="block font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Revista
          </Link>
        </div>
      )}
    </div>
  )

  const footer = (
    <footer className={`bg-primary py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Brand mark */}
        <div className="text-center mb-12">
          <span className="font-brand text-2xl tracking-[0.35em] uppercase"
            style={{ color: 'hsl(var(--primary-foreground))' }}>
            SOLEÏ
          </span>
          <div className="gold-divider mt-5" />
          <p className="mt-5 text-xs tracking-widest uppercase font-light"
            style={{ color: 'hsl(var(--primary-foreground) / 0.6)' }}>
            Luxury Women's Beachwear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Navigation */}
          <div>
            <h3 className="text-[10px] tracking-widest uppercase font-semibold mb-5"
              style={{ color: 'hsl(var(--primary-foreground) / 0.5)' }}>
              Tienda
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Inicio', to: '/' },
                { label: 'Swimwear', to: '/#collections' },
                { label: 'Cover-ups', to: '/#collections' },
                { label: 'Accesorios', to: '/#products' },
              ].map(({ label, to }) => (
                <Link key={label} to={to}
                  className="block text-xs tracking-wider font-light transition-colors hover:opacity-100"
                  style={{ color: 'hsl(var(--primary-foreground) / 0.65)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] tracking-widest uppercase font-semibold mb-5"
              style={{ color: 'hsl(var(--primary-foreground) / 0.5)' }}>
              Legal
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Términos y Condiciones', to: '/terminos-y-condiciones' },
                { label: 'Aviso de Privacidad', to: '/aviso-de-privacidad' },
                { label: 'Blog', to: '/blog' },
              ].map(({ label, to }) => (
                <Link key={label} to={to}
                  className="block text-xs tracking-wider font-light transition-colors hover:opacity-100"
                  style={{ color: 'hsl(var(--primary-foreground) / 0.65)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[10px] tracking-widest uppercase font-semibold mb-5"
              style={{ color: 'hsl(var(--primary-foreground) / 0.5)' }}>
              Síguenos
            </h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-[10px] tracking-widest uppercase"
          style={{ borderColor: 'hsl(var(--primary-foreground) / 0.15)', color: 'hsl(var(--primary-foreground) / 0.4)' }}>
          © 2025 SOLEÏ. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )

  return (
    <>
      <PageTemplate
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>

      {showCart && <FloatingCart hideOnMobile={hideFloatingCartOnMobile} />}
    </>
  )
}