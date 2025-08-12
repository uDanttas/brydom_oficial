import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function MestreDashboard() {
  const [stats, setStats] = useState({
    totalClientes: 0,
    totalLucro: 0,
    botsAtivos: 0,
    operacoesHoje: 0,
    precisaoBot: 99.999
  })
  const [operacoes, setOperacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simular dados em tempo real
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalLucro: prev.totalLucro + (Math.random() * 10 + 5),
        operacoesHoje: prev.operacoesHoje + 1,
        precisaoBot: 99.999 - (Math.random() * 0.001)
      }))

      // Adicionar nova operação
      const novaOperacao = {
        id: Date.now(),
        par: 'BTCUSDT',
        tipo: Math.random() > 0.5 ? 'COMPRA' : 'VENDA',
        valor: (Math.random() * 10 + 5).toFixed(2),
        lucro: (Math.random() * 10 + 5).toFixed(2),
        timestamp: new Date().toLocaleTimeString()
      }

      setOperacoes(prev => [novaOperacao, ...prev.slice(0, 9)])
    }, 10000) // Atualiza a cada 10 segundos

    // Dados iniciais
    setStats({
      totalClientes: 1247,
      totalLucro: 89432.50,
      botsAtivos: 12,
      operacoesHoje: 2847,
      precisaoBot: 99.999
    })

    setLoading(false)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>BRYDOM BANK - Dashboard Mestre</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold gradient-text">BRYDOM BANK</h1>
                <p className="text-sm text-gray-600">Dashboard do Mestre</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">Sistema Online</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="card">
              <h3 className="text-sm font-medium text-gray-500">Total de Clientes</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClientes.toLocaleString()}</p>
            </div>
            <div className="card">
              <h3 className="text-sm font-medium text-gray-500">Lucro Total</h3>
              <p className="text-2xl font-bold profit-positive">R$ {stats.totalLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="card">
              <h3 className="text-sm font-medium text-gray-500">Bots Ativos</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.botsAtivos}</p>
            </div>
            <div className="card">
              <h3 className="text-sm font-medium text-gray-500">Operações Hoje</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.operacoesHoje.toLocaleString()}</p>
            </div>
            <div className="card">
              <h3 className="text-sm font-medium text-gray-500">Precisão do Bot</h3>
              <p className="text-2xl font-bold text-green-600">{stats.precisaoBot.toFixed(3)}%</p>
            </div>
          </div>

          {/* Operações em Tempo Real */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Operações em Tempo Real</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {operacoes.map((op) => (
                  <div key={op.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{op.par}</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded ${
                        op.tipo === 'COMPRA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {op.tipo}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold profit-positive">+R$ {op.lucro}</div>
                      <div className="text-xs text-gray-500">{op.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles do Sistema */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Controles do Sistema</h2>
              <div className="space-y-4">
                <button className="w-full btn-primary">
                  Gerenciar Clientes
                </button>
                <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
                  Configurar Bots
                </button>
                <button className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                  Relatórios Financeiros
                </button>
                <button className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                  Configurações Avançadas
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Status da IA Quântica</h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Processamento Neural</span>
                  <span className="status-online">ATIVO</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Análise Preditiva</span>
                  <span className="status-online">ATIVO</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Otimização Quântica</span>
                  <span className="status-online">ATIVO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

