import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import {
  createClient,
  WagmiConfig,
  configureChains,
  defaultChains,
} from 'wagmi'
import {
  DynamicContextProvider,
  useDynamicContext,
} from '@dynamic-labs/sdk-react'
import { providers } from 'ethers'

import { DynamicConnector, getClient } from '../wagmi'

import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

const noopClient = createClient({
  provider,
  webSocketProvider,
})

function HydrateWagmi({ children }: { children: React.ReactNode }) {
  const { user, showAuthFlow, walletConnector } = useDynamicContext()

  if (user && !showAuthFlow && walletConnector) {
    DynamicConnector.setWalletConnector(walletConnector)

    return (
      <WagmiConfig
        client={getClient(
          walletConnector.getWeb3Provider() as providers.Web3Provider,
        )}
      >
        {children}
      </WagmiConfig>
    )
  }

  return <WagmiConfig client={noopClient}>{children}</WagmiConfig>
}

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <DynamicContextProvider
      settings={{
        appLogoUrl: '',
        appName: '',
        apiBaseUrl: 'https://app.dynamic-preprod.xyz/api/v0',
        environmentId: '67ddb74b-e30f-4039-9a25-f033c79f1207',
      }}
    >
      <HydrateWagmi>
        <NextHead>
          <title>wagmi</title>
        </NextHead>

        {mounted && <Component {...pageProps} />}
      </HydrateWagmi>
    </DynamicContextProvider>
  )
}

export default App
