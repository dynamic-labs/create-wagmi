import { ethers } from 'ethers'
import { Address, Connector, ConnectorData } from 'wagmi'
import { providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'

import { WalletConnector } from '@dynamic-labs/sdk-react'

export class WagmiConnector extends Connector<
  providers.Web3Provider,
  any,
  ethers.providers.JsonRpcProvider
> {
  walletConnector: WalletConnector | undefined
  id: string
  name: string
  ready: boolean

  constructor(walletConnector?: WalletConnector) {
    super({ chains: [], options: {} })
    this.walletConnector = walletConnector
    this.ready = true
    this.name = walletConnector?.name || ''
    this.id = walletConnector?.name || '1'
  }

  setWalletConnector(walletConnector: WalletConnector) {
    this.walletConnector = walletConnector
    this.name = walletConnector.name
    this.id = walletConnector.name
  }

  getChainId(): Promise<number> {
    return Promise.resolve(1)
  }

  getProvider(
    config?: { chainId?: number | undefined } | undefined,
  ): Promise<providers.Web3Provider> {
    return Promise.resolve(
      this.walletConnector?.getWeb3Provider() as unknown as providers.Web3Provider,
    )
  }

  getSigner(
    config?: { chainId?: number | undefined } | undefined,
  ): Promise<ethers.providers.JsonRpcProvider> {
    return Promise.resolve(
      this.walletConnector?.getSigner() as unknown as ethers.providers.JsonRpcProvider,
    )
  }

  async isAuthorized(): Promise<boolean> {
    console.log('walletConnector', this.walletConnector)
    const accounts = await this.walletConnector?.getConnectedAccounts()

    console.log('accounts', accounts)

    if (accounts?.length) {
      return true
    } else {
      return false
    }
  }
  protected onAccountsChanged(accounts: `0x${string}`[]): void {
    throw new Error('Method not implemented.')
  }
  protected onChainChanged(chain: string | number): void {
    throw new Error('Method not implemented.')
  }
  protected onDisconnect(error: Error): void {
    throw new Error('Method not implemented.')
  }
  async connect(config?: {
    chainId?: number
  }): Promise<Required<ConnectorData>> {
    console.log('in our connector')
    const account = await this.getAccount()
    const provider = await this.getProvider()

    return { account, chain: { id: 1, unsupported: false }, provider }
  }

  async disconnect(): Promise<void> {
    return
  }

  async getAccount(): Promise<Address> {
    const publicAddress = await this.walletConnector?.fetchPublicAddress()
    return getAddress(publicAddress!)
  }
}
