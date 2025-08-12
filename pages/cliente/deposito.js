import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Deposito() {
  const [valor, setValor] = useState('')
  const [metodo, setMetodo] = useState('pix')
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [chavePix, setChavePix] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleDeposito = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simular geração de QR Code PIX
    setTimeout(() => {
      setQrCode('00020126580014BR.GOV.BCB.PIX013636401190-4040-404040-4040-40404040404040520400005303986540' + valor + '5802BR5913BRYDOM BANK6009SAO PAULO62070503***6304ABCD')
      setChavePix('brydom.bank@pix.com.br')
      setLoading(false)
    }, 2000)
  }

  const confirmarPagamento = () => {
    setSuccess(true)
    setTimeout(() => {
      router.push('/cliente/dashboard')
    }, 3000)
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
          <h2 className="text-2xl font-bold text-green-600 mb-2">Depósito Confirmado!</h2>
          <p className="text-gray-600 mb-4">
            Seu depósito de R$ {parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} foi confirmado.
          </p>
          <p className="text-sm text-gray-500">
            O valor já está disponível em sua conta e os bots começarão a operar automaticamente.
          </p>
        </div>
      </div>
    )
  }

  if (qrCode) {
    return (
      <>
        <Head>
          <title>BRYDOM BANK - Pagamento PIX</title>
        </Head>

        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div>
                  <h1 className="text-2xl font-bold gradient-text">BRYDOM BANK</h1>
                  <p className="text-sm text-gray-600">Pagamento PIX</p>
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
            <div className="card text-center">
              <h2 className="text-2xl font-bold mb-4">Pagamento PIX</h2>
              <p className="text-gray-600 mb-6">
                Valor: <span className="font-bold text-blue-600">
                  R$ {parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </p>

              {/* QR Code Simulado */}
              <div className="bg-white p-8 rounded-lg border-2 border-gray-200 mb-6 inline-block">
                <div className="w-48 h-48 bg-black mx-auto flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-xs">QR CODE PIX</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-800 mb-2">Chave PIX</h3>
                  <p className="text-blue-700 font-mono text-sm break-all">{chavePix}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-800 mb-2">Instruções</h3>
                  <ul className="text-sm text-yellow-700 text-left space-y-1">
                    <li>1. Abra o app do seu banco</li>
                    <li>2. Escaneie o QR Code ou use a chave PIX</li>
                    <li>3. Confirme o pagamento</li>
                    <li>4. Clique em "Confirmei o Pagamento" abaixo</li>
                  </ul>
                </div>

                <button
                  onClick={confirmarPagamento}
                  className="w-full btn-primary"
                >
                  Confirmei o Pagamento
                </button>

                <p className="text-xs text-gray-500">
                  O depósito será creditado automaticamente após a confirmação
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>BRYDOM BANK - Depósito</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold gradient-text">BRYDOM BANK</h1>
                <p className="text-sm text-gray-600">Depósito</p>
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
              <h2 className="text-2xl font-bold mb-2">Fazer Depósito</h2>
              <p className="text-gray-600">
                Adicione fundos à sua conta para que os bots comecem a operar
              </p>
            </div>

            <form onSubmit={handleDeposito} className="space-y-6">
              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Depósito
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
                    min="50"
                    step="0.01"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Valor mínimo: R$ 50,00</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pagamento
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="metodo"
                      value="pix"
                      checked={metodo === 'pix'}
                      onChange={(e) => setMetodo(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">PIX</span>
                      </div>
                      <div>
                        <div className="font-medium">PIX</div>
                        <div className="text-sm text-gray-500">Instantâneo e sem taxas</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">Vantagens do BRYDOM BANK</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Bots com IA Quântica operando 24/7</li>
                  <li>• Lucro garantido de R$ 5 a R$ 10 por operação</li>
                  <li>• Precisão de 99.999% (apenas 0.001% de erro)</li>
                  <li>• Operações a cada 10 segundos na Binance real</li>
                  <li>• Saques instantâneos sem taxas</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading || !valor}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Gerando PIX...
                  </div>
                ) : (
                  'Gerar PIX'
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

