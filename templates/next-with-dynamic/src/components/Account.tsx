import {
  useAccount,
  useDisconnect,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi'
import { parseEther } from 'ethers/lib/utils.js'

import { useDynamicContext } from '@dynamic-labs/sdk-react'

export function Account() {
  const { user, handleLogOut } = useDynamicContext()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { config, error } = usePrepareSendTransaction({
    request: {
      to: '0x0000000000000000000000000000000000000000',
      value: parseEther('0.001'),
    },
  })

  const { sendTransaction } = useSendTransaction(config)
  return (
    <div>
      <h2> Dyanmic </h2>
      <p>Address: {user?.walletPublicKey}</p>

      <h2> Wagmi </h2>
      <p> {isConnected ? 'Connected' : 'Not Connected'} </p>
      <p> Address: {address} </p>
      <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Send Transaction
      </button>
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}

      <button
        type="button"
        onClick={() => {
          handleLogOut()
          disconnect()
        }}
      >
        Log Out
      </button>
    </div>
  )
}
