import { useState } from "react";

// ECommerce Platform - Estructura inicial con funcionalidades básicas
// Incluye: navegación, catálogo de productos, carrito de compras, filtros

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    title: "Zapatillas Runner X",
    price: 79.99,
    category: "Deporte",
    image: "https://via.placeholder.com/400x300?text=Zapatillas",
  },
  {
    id: 2,
    title: "Auriculares NoiseCancel",
    price: 129.0,
    category: "Electrónica",
    image: "https://via.placeholder.com/400x300?text=Auriculares",
  },
  {
    id: 3,
    title: "Mochila Urban Pro",
    price: 59.5,
    category: "Accesorios",
    image: "https://via.placeholder.com/400x300?text=Mochila",
  },
  {
    id: 4,
    title: "Reloj SmartFit",
    price: 199.99,
    category: "Electrónica",
    image: "https://via.placeholder.com/400x300?text=Reloj",
  },
  {
    id: 5,
    title: "Camiseta Eco",
    price: 25.0,
    category: "Ropa",
    image: "https://via.placeholder.com/400x300?text=Camiseta",
  },
  {
    id: 6,
    title: "Lámpara Minimal",
    price: 34.9,
    category: "Hogar",
    image: "https://via.placeholder.com/400x300?text=Lámpara",
  },
];

interface HeaderProps {
  onNavigate: (page: string) => void;
  cartItemsCount: number;
}

function Header({ onNavigate, cartItemsCount }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-3xl font-bold text-white tracking-tight">
            ✨ MiTienda
          </div>
          <nav className="hidden md:flex gap-6 text-white/90">
            <button 
              onClick={() => onNavigate("home")} 
              className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:text-white hover:scale-105"
            >
              Inicio
            </button>
            <button 
              onClick={() => onNavigate("catalog")} 
              className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:text-white hover:scale-105"
            >
              Catálogo
            </button>
            <button 
              onClick={() => onNavigate("about")} 
              className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:text-white hover:scale-105"
            >
              Sobre nosotros
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block relative">
            <input
              className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm w-64 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all duration-300"
              placeholder="Buscar productos..."
              aria-label="buscar"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70">
              🔍
            </div>
          </div>
          <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
            Iniciar sesión
          </button>
          <button 
            onClick={() => onNavigate("cart")} 
            className="relative px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full text-sm hover:from-orange-500 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
          >
            🛒 Carrito ({cartItemsCount})
            {cartItemsCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                {cartItemsCount}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold text-white mb-4">
              ✨ MiTienda
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu destino para las mejores compras online. Productos de calidad, 
              precios increíbles y la mejor experiencia de usuario.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                📘
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                🐦
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                📷
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                💼
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Catálogo</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Ofertas</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Sobre Nosotros</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Envíos</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Devoluciones</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">🔔 Suscríbete a nuestro newsletter</h3>
              <p className="text-gray-300">Recibe las mejores ofertas y novedades</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 flex-1 md:w-64"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-violet-600 transition-all transform hover:scale-105">
                Suscribir
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} MiTienda</span>
            <span className="text-pink-400">•</span>
            <span>Todos los derechos reservados</span>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-2">
            <span>Hecho con</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>para ti</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface HeroProps {
  onNavigate: (page: string) => void;
}

function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
      </div>
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-ping"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🚀 Nueva experiencia de compra
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Bienvenido a
              </span>
              <br />
              <span className="text-white">MiTienda ✨</span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Descubre productos increíbles con la mejor experiencia de compra online. 
              Tecnología, moda, deportes y mucho más te esperan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate("catalog")} 
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                🛍️ Explorar Catálogo
              </button>
              <button 
                onClick={() => onNavigate("about")} 
                className="px-8 py-4 bg-white/10 border-2 border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                💡 Saber Más
              </button>
            </div>

            <div className="flex gap-8 mt-12 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-400">1000+</div>
                <div className="text-purple-200 text-sm">Productos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-400">50k+</div>
                <div className="text-purple-200 text-sm">Clientes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-400">99%</div>
                <div className="text-purple-200 text-sm">Satisfacción</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl flex items-center justify-center text-white/70 text-xl font-semibold backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <div>Experiencia de Compra Premium</div>
                </div>
                
                <div className="absolute top-6 right-6 bg-pink-500 rounded-full p-3 animate-bounce">
                  💖
                </div>
                <div className="absolute bottom-6 left-6 bg-violet-500 rounded-full p-3 animate-pulse">
                  ⚡
                </div>
                <div className="absolute top-1/2 right-12 bg-indigo-500 rounded-full p-2 animate-ping">
                  🎯
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl transform rotate-12 animate-pulse">
                <div className="text-2xl">🔥</div>
                <div className="text-xs font-bold">Ofertas</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl p-4 shadow-xl transform -rotate-12 animate-bounce">
                <div className="text-2xl">⭐</div>
                <div className="text-xs font-bold">Premium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100">
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          {product.category}
        </span>
      </div>
      
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex text-yellow-400">
            ⭐⭐⭐⭐⭐
          </div>
        </div>
        
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
        >
          🛒 Añadir al Carrito
        </button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </article>
  );
}

interface CatalogProps {
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function Catalog({ onAddToCart, selectedCategory, onCategoryChange }: CatalogProps) {
  const categories = ["Todas", "Deporte", "Electrónica", "Accesorios", "Ropa", "Hogar"];
  
  const filteredProducts = selectedCategory && selectedCategory !== "Todas" 
    ? sampleProducts.filter(product => product.category === selectedCategory)
    : sampleProducts;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 bg-white border rounded p-4">
          <h4 className="font-semibold mb-3">Filtros</h4>
          <div className="text-sm text-gray-600">Categorías</div>
          <ul className="mt-2 space-y-2 text-gray-700">
            {categories.map(category => (
              <li key={category}>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category"
                    checked={selectedCategory === category || (selectedCategory === "" && category === "Todas")}
                    onChange={() => onCategoryChange(category === "Todas" ? "" : category)}
                  /> 
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Catálogo</h2>
            <div className="text-sm text-gray-600">Mostrando {filteredProducts.length} productos</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard product={p} key={p.id} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  total: number;
  onNavigate: (page: string) => void;
}

function Cart({ items, onUpdateQuantity, onRemoveItem, total, onNavigate }: CartProps) {
  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20">
        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-16">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            ¡Descubre productos increíbles y llena tu carrito de alegría! 🌟
          </p>
          <button
            onClick={() => onNavigate("catalog")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 hover:shadow-xl"
          >
            🛍️ Explorar Productos
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🛒 Carrito de Compras
        </h2>
        <p className="text-gray-600">Revisa tus productos antes de finalizar la compra</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">{item.title}</h3>
                  <p className="text-purple-500 font-semibold">{item.category}</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-full p-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-red-500 hover:to-pink-600 transition-all transform hover:scale-110 font-bold"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-110 font-bold"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 h-fit sticky top-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">💳 Resumen del Pedido</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Envío:</span>
              <span className="font-bold text-lg text-green-600">$5.00</span>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${(total + 5).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 hover:shadow-xl mb-3">
            💰 Proceder al Pago
          </button>
          
          <button 
            onClick={() => onNavigate("catalog")}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            🛍️ Seguir Comprando
          </button>
          
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Envío gratuito en compras +$50</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Devolución gratuita 30 días</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Garantía de calidad</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sobre MiTienda ✨
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Somos más que una tienda online, somos tu compañero de confianza en el mundo del comercio digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Nuestra Misión</h3>
            <p className="text-gray-600 leading-relaxed">
              Brindar la mejor experiencia de compra online con productos de calidad, 
              precios justos y un servicio al cliente excepcional.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Nuestra Visión</h3>
            <p className="text-gray-600 leading-relaxed">
              Ser la plataforma de eCommerce líder, conectando a millones de personas 
              con los productos que aman y necesitan.
            </p>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-12 rounded-3xl">
          <h3 className="text-3xl font-bold mb-6">¿Por qué elegir MiTienda?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-semibold mb-2">Envío Rápido</h4>
              <p className="text-purple-100">Entrega en 24-48 horas</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold mb-2">Compra Segura</h4>
              <p className="text-purple-100">Transacciones protegidas</p>
            </div>
            <div>
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-semibold mb-2">Soporte 24/7</h4>
              <p className="text-purple-100">Siempre estamos aquí</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function EcommercePrototype() {
  const [page, setPage] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderPage = () => {
    switch (page) {
      case "catalog":
        return (
          <Catalog
            onAddToCart={addToCart}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        );
      case "cart":
        return (
          <Cart
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            total={getCartTotal()}
            onNavigate={setPage}
          />
        );
      case "about":
        return <About />;
      default:
        return (
          <>
            <Hero onNavigate={setPage} />
            <Catalog
              onAddToCart={addToCart}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col">
      <Header onNavigate={setPage} cartItemsCount={getCartItemsCount()} />
      <div className="flex-1">{renderPage()}</div>
      <Footer />
    </div>
  );
}
