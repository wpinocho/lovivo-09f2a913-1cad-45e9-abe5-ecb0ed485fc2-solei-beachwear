import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { BundleCard } from '@/components/ui/BundleCard';
import { useBundles } from '@/hooks/useBundles';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Sun, Package } from 'lucide-react';
import { ScrollLink } from '@/components/ScrollLink';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts
  } = logic;

  const { bundles, loading: loadingBundles } = useBundles();

  return (
    <EcommerceTemplate showCart={true} layout="full-width">

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden hero-section"
        aria-label="SOLEÏ hero"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero.webp)' }}
        />
        {/* Bordeaux overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'hsl(var(--hero-bg) / 0.65)' }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p
            className="text-[10px] tracking-[0.4em] uppercase font-light mb-8 animate-fade-in"
            style={{ color: 'hsl(var(--hero-fg) / 0.7)', animationDelay: '0.2s' }}
          >
            Nouvelle Collection · Été 2025
          </p>

          {/* Brand wordmark */}
          <h1
            className="font-brand text-[4rem] sm:text-[6rem] md:text-[8rem] leading-none animate-fade-up"
            style={{ color: 'hsl(var(--hero-fg))', animationDelay: '0.4s' }}
          >
            SOLEÏ
          </h1>

          {/* Gold divider */}
          <div
            className="mx-auto my-8 animate-fade-in"
            style={{
              width: '3rem',
              height: '1px',
              background: 'hsl(var(--hero-fg) / 0.7)',
              animationDelay: '0.7s'
            }}
          />

          {/* Tagline */}
          <p
            className="font-display text-lg sm:text-xl font-light italic leading-relaxed animate-fade-up"
            style={{ color: 'hsl(var(--hero-fg) / 0.8)', animationDelay: '0.8s' }}
          >
            Pour la femme qui porte l'été sur sa peau.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up"
            style={{ animationDelay: '1s' }}
          >
            <ScrollLink to="/#products">
              <Button
                className="px-10 py-6 text-[11px] tracking-[0.3em] uppercase font-medium"
                style={{
                  background: 'hsl(var(--hero-fg))',
                  color: 'hsl(var(--hero-bg))',
                  borderRadius: '0'
                }}
              >
                Explorar Colección
              </Button>
            </ScrollLink>
            <ScrollLink to="/#collections">
              <Button
                variant="outline"
                className="px-10 py-6 text-[11px] tracking-[0.3em] uppercase font-medium border"
                style={{
                  background: 'transparent',
                  color: 'hsl(var(--hero-fg))',
                  borderColor: 'hsl(var(--hero-fg) / 0.5)',
                  borderRadius: '0'
                }}
              >
                Ver Colecciones
              </Button>
            </ScrollLink>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ color: 'hsl(var(--hero-fg) / 0.5)', animationDelay: '1.5s' }}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase">Descubrir</span>
          <div className="h-8 w-px" style={{ background: 'hsl(var(--hero-fg) / 0.3)' }} />
        </div>
      </section>

      {/* ─── ANNOUNCEMENT MARQUEE ─── */}
      <div
        className="overflow-hidden py-3 border-y"
        style={{ background: 'hsl(var(--primary))', borderColor: 'hsl(var(--primary))' }}
      >
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 mx-6 text-[10px] tracking-[0.25em] uppercase font-light flex-shrink-0"
              style={{ color: 'hsl(var(--primary-foreground) / 0.8)' }}
            >
              <span>Envío Express</span>
              <span style={{ color: 'hsl(var(--primary-foreground) / 0.4)' }}>·</span>
              <span>UPF 50+</span>
              <span style={{ color: 'hsl(var(--primary-foreground) / 0.4)' }}>·</span>
              <span>Tejidos Reciclados</span>
              <span style={{ color: 'hsl(var(--primary-foreground) / 0.4)' }}>·</span>
              <span>Tallas XS — XL</span>
              <span style={{ color: 'hsl(var(--primary-foreground) / 0.4)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── COLLECTIONS ─── */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">La Boutique</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground tracking-wide">
              Nuestras Colecciones
            </h2>
            <div className="gold-divider mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                onClick={() => handleViewCollectionProducts(collection.id)}
                className="group relative overflow-hidden aspect-[4/5] block text-left w-full"
                aria-label={`Ver colección ${collection.name}`}
              >
                {collection.image ? (
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <div className="absolute inset-0 bg-secondary" />
                )}
                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, hsl(var(--primary) / 0.85) 0%, hsl(var(--primary) / 0.2) 50%, transparent 100%)' }}
                />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p
                    className="text-[9px] tracking-[0.35em] uppercase mb-3 font-light"
                    style={{ color: 'hsl(var(--primary-foreground) / 0.6)' }}
                  >
                    Colección
                  </p>
                  <h3
                    className="font-display text-2xl font-light mb-4 tracking-wide"
                    style={{ color: 'hsl(var(--primary-foreground))' }}
                  >
                    {collection.name}
                  </h3>
                  <span
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 group-hover:gap-3"
                    style={{ color: 'hsl(var(--accent))' }}
                  >
                    Descubrir <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Loading skeleton for collections */}
      {loadingCollections && (
        <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map(i => (
              <div key={i} className="aspect-[4/5] bg-muted animate-pulse" />
            ))}
          </div>
        </section>
      )}

      {/* ─── BUNDLES ─── */}
      {!loadingBundles && bundles.length > 0 && (
        <section id="bundles" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Exclusivo</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground tracking-wide">
              Paquetes Especiales
            </h2>
            <div className="gold-divider mt-5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bundles.map(bundle => <BundleCard key={bundle.id} bundle={bundle} />)}
          </div>
        </section>
      )}

      {/* ─── PRODUCTS ─── */}
      <section id="products" className="py-20 px-6 lg:px-12 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Piezas SOLEÏ</p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground tracking-wide">
                {selectedCollectionId
                  ? collections.find(c => c.id === selectedCollectionId)?.name ?? 'Colección'
                  : 'Productos Destacados'
                }
              </h2>
              <div className="gold-divider mt-5 !mx-0" />
            </div>
            {selectedCollectionId && (
              <Button
                variant="outline"
                onClick={handleShowAllProducts}
                className="text-[10px] tracking-[0.25em] uppercase px-6 py-3 border-foreground/30 hover:bg-foreground hover:text-background transition-colors"
                style={{ borderRadius: '0' }}
              >
                Ver Todos
              </Button>
            )}
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card-hover">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm tracking-wide">No hay productos disponibles.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── BRAND VALUES ─── */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: <Sun className="h-6 w-6 mx-auto mb-5" />,
              title: 'UPF 50+',
              text: 'Máxima protección solar integrada en cada tejido para que disfrutes sin preocupaciones.'
            },
            {
              icon: <Leaf className="h-6 w-6 mx-auto mb-5" />,
              title: 'Tejidos Reciclados',
              text: 'Comprometidas con el océano que amamos. Nuestros tejidos provienen de plástico reciclado del mar.'
            },
            {
              icon: <Package className="h-6 w-6 mx-auto mb-5" />,
              title: 'Envío Express',
              text: 'Recibe tu pieza SOLEÏ en 24-48 horas. Porque el verano no puede esperar.'
            }
          ].map(({ icon, title, text }) => (
            <div key={title} className="group">
              <div className="text-accent">{icon}</div>
              <div className="gold-divider mb-5" />
              <h3 className="font-display text-xl font-light tracking-widest uppercase text-foreground mb-3">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EDITORIAL BANNER ─── */}
      <section
        className="relative overflow-hidden py-28 px-6 text-center hero-section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(/hero.webp)' }}
        />
        <div className="absolute inset-0" style={{ background: 'hsl(var(--hero-bg) / 0.88)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-6 font-light"
            style={{ color: 'hsl(var(--primary-foreground) / 0.6)' }}
          >
            La Filosofía SOLEÏ
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-snug mb-8"
            style={{ color: 'hsl(var(--primary-foreground))' }}
          >
            "La elegancia no es llamar la atención,
            <br />
            <em>sino ser recordada."</em>
          </h2>
          <div className="gold-divider mb-8" />
          <Link to="/#products">
            <Button
              className="px-10 py-5 text-[10px] tracking-[0.3em] uppercase"
              style={{
                background: 'hsl(var(--accent))',
                color: 'hsl(var(--hero-bg))',
                borderRadius: '0'
              }}
            >
              Descubrir la Colección
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};