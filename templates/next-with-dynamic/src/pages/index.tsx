import { useAccount } from 'wagmi'

import { Account } from '../components'
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react'

function Page() {
  const { isConnected } = useAccount()
  const { walletConnector } = useDynamicContext()

  return (
    <>
      <h1>wagmi + Next.js + Dynamic</h1>

      <DynamicWidget />

      {isConnected && walletConnector && <Account />}
    </>
  )
}

export default Page
