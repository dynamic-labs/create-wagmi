import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from './components'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Create React App</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}
