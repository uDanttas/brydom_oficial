import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Saque() {
  const [valor, setValor] = useState('')
  const [chavePix, setChavePix] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const saldoDisponivel = 15420.75

  const handleSaque = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simular processamento
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      
      setTimeout(() => {
        router.push('/cliente/dashboard')
      }, 3000)
    }, 2000)
  }

  const voltar = () => {
    router.push('/cliente/dashboard')
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Saque Realizado!</h2>
          <p className="text-gray-600 mb-4">
            Seu saque de R$ {parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} foi processado com sucesso.
          </p>
          <p className="text-sm text-gray-500">
            O valor será creditado em sua conta em até 2 minutos.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>BRYDOM BANK - Saque</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold gradient-text">BRYDOM BANK</h1>
                <p className="text-sm text-gray-600">Saque</p>
              </div>
              <button
                onClick={voltar}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Realizar Saque</h2>
              <p className="text-gray-600">
                Saldo disponível: <span className="font-bold text-green-600">
                  R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </p>
            </div>

            <form onSubmit={handleSaque} className="space-y-6">
              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Saque
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">R$</span>
                  <input
                    type="number"
                    id="valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0,00"
                    min="10"
                    max={saldoDisponivel}
                    step="0.01"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Valor mínimo: R$ 10,00</p>
              </div>

              <div>
                <label htmlFor="chavePix" className="block text-sm font-medium text-gray-700 mb-2">
                  Chave PIX
                </label>
                <input
                  type="text"
                  id="chavePix"
                  value={chavePix}
                  onChange={(e) => setChavePix(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite sua chave PIX (CPF, e-mail, telefone ou chave aleatória)"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">Informações Importantes</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Saques são processados instantaneamente</li>
                  <li>• Não cobramos taxas para saques</li>
                  <li>• O valor será creditado em até 2 minutos</li>
                  <li>• Disponível 24 horas por dia, 7 dias por semana</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading || !valor || !chavePix}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando Saque...
                  </div>
                ) : (
                  'Confirmar Saque'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Seus dados estão protegidos com criptografia de nível bancário
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

