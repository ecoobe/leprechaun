export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <span className="text-green-500 font-bold">L</span>
            </div>
            <span className="text-xl font-bold text-white">Leprechaun</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Главная</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Инструменты</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">О сервисе</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">
              Войти
            </button>
            <button className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
              Регистрация
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Контроль ваших <span className="text-green-500">финансов</span> стал проще
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Leprechaun — это бесплатный сервис для управления долгами, 
            кредитами и платежами. Получайте уведомления в Telegram, 
            анализируйте долговую нагрузку и стройте финансовое будущее.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <button className="px-8 py-4 text-lg rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105">
              Начать бесплатно
            </button>
            <button className="px-8 py-4 text-lg rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all transform hover:scale-105">
              Узнать больше
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-green-500/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6 mx-auto">
                <span className="text-green-500 text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Уведомления о платежах</h3>
              <p className="text-gray-400">
                Получайте напоминания о всех платежах в одном Telegram-боте
              </p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-green-500/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6 mx-auto">
                <span className="text-green-500 text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Анализ долгов</h3>
              <p className="text-gray-400">
                Вся долговая нагрузка в одном месте с понятной визуализацией
              </p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-green-500/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6 mx-auto">
                <span className="text-green-500 text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">ИИ-помощник</h3>
              <p className="text-gray-400">
                Персональный план погашения долгов на основе вашего дохода
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-gray-800 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Готовы взять финансы под контроль?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к сообществу людей, которые уже избавились 
              от финансового стресса с помощью Leprechaun
            </p>
            <button className="px-10 py-4 text-lg rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105">
              Зарегистрироваться бесплатно
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>© 2024 Leprechaun Finance. Сервис полностью бесплатен.</p>
          <p className="mt-2 text-sm">Сделано с ❤️ для тех, кто хочет разобраться в своих финансах</p>
        </div>
      </footer>
    </div>
  )
}