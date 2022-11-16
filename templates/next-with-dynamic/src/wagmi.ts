import { ethers } from 'ethers'
import { createClient, configureChains, defaultChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import { WagmiConnector } from './WagmiConnector'

const { provider: wagmiProvider } = configureChains(defaultChains, [
  publicProvider(),
])

export const DynamicConnector = new WagmiConnector()

let client: any

export const getClient = (walletProvider: ethers.providers.Web3Provider) => {
  if (!client) {
    console.log('creating client')
    console.log(walletProvider)
    client = createClient({
      autoConnect: true,
      connectors: [DynamicConnector],
      provider: wagmiProvider,
    })
  }
  return client
}
