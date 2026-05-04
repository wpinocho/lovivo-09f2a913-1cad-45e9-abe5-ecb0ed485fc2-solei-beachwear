import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Package, Mail, ArrowLeft, ShoppingBag } from 'lucide-react'
import { formatMoney } from '@/lib/money'
import { useToast } from '@/hooks/use-toast'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

interface OrderDetails {
  id: string
  order_number: string
  total_amount: number
  currency_code: string
  status: string
  shipping_address?: any
  billing_address?: any
  order_items: any[]
  created_at: string
}

const ThankYou = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      return
    }

    const loadOrder = () => {
      try {
        // Try to get order from localStorage (saved from successful payment)
        const completedOrderJson = localStorage.getItem('completed_order')
        if (completedOrderJson) {
          const completedOrder = JSON.parse(completedOrderJson)
          setOrder(completedOrder)
          // Clean up localStorage
          localStorage.removeItem('completed_order')
        } else {
          setOrder(null)
        }
      } catch (error) {
        console.error('Error loading order:', error)
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  if (loading) {
    return (
      <EcommerceTemplate showCart={true}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!order) {
    return (
      <EcommerceTemplate showCart={true}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="border-dashed">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-muted p-6">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl">Pedido no encontrado</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Parece que aún no has completado una compra, o este enlace de pedido ha expirado.
                  </p>
                </div>
                <Button 
                  size="lg"
                  asChild
                  className="mt-4"
                >
                  <Link to="/">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Comenzar a Comprar
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </EcommerceTemplate>
    )
  }

  return (
    <EcommerceTemplate pageTitle="Confirmación de Pedido" showCart={true}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Confirmation Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ¡Pago Confirmado!
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          </p>
          <Badge variant="secondary" className="text-sm">
            Pedido #{order.order_number}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Detalles del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {order.order_items.filter(item => item.quantity > 0).map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Product Image */}
                    {item.product_images && item.product_images.length > 0 && (
                      <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.product_images[0]} 
                          alt={item.product_name || 'Producto'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <p className="font-medium">{item.product_name || 'Producto'}</p>
                      {item.variant_name && (
                        <p className="text-sm text-muted-foreground">
                          {item.variant_name}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatMoney(item.price * item.quantity, order.currency_code)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatMoney(order.total_amount, order.currency_code)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Información de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const ship: any = order.shipping_address
                const hasAddress = ship && (ship.line1 || ship.address1 || ship.city)
                if (!hasAddress) {
                  return (
                    <div>
                      <h4 className="font-medium mb-2">Dirección de Envío:</h4>
                      <p className="text-sm text-muted-foreground">
                        Los detalles de entrega se enviarán por correo.
                      </p>
                    </div>
                  )
                }

                const fullName = ship.name
                  || [ship.first_name, ship.last_name].filter(Boolean).join(' ')
                  || ''
                const line1 = ship.line1 ?? ship.address1 ?? ''
                const line2 = ship.line2 ?? ship.address2 ?? ''
                const state = ship.state ?? ship.state_name ?? ship.province ?? ''
                const postal = ship.postal_code ?? ship.zip ?? ''
                const country = ship.country_name ?? ship.country ?? ''

                return (
                  <div>
                    <h4 className="font-medium mb-2">Dirección de Envío:</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {fullName && <p>{fullName}</p>}
                      {line1 && <p>{line1}</p>}
                      {line2 && <p>{line2}</p>}
                      <p>
                        {[ship.city, state].filter(Boolean).join(', ')}
                      </p>
                      <p>{[postal, country].filter(Boolean).join(' ')}</p>
                      {ship.phone && <p>Teléfono: {ship.phone}</p>}
                    </div>
                  </div>
                )
              })()}

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Próximos Pasos:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Recibirás un correo de confirmación</li>
                  <li>• Te notificaremos cuando tu pedido esté listo</li>
                  <li>• Puedes rastrear tu pedido con el número #{order.order_number}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Seguir Comprando
            </Link>
          </Button>
        </div>
      </div>
    </EcommerceTemplate>
  )
}

export default ThankYou