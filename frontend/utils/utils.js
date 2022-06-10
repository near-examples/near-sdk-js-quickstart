import { connect, keyStores, WalletConnection } from 'near-api-js'
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn("jsvm.testnet")
}

export async function flip_coin(side, points){
  if (points == null) {
    console.log("First Time Playing!");
  }

  let account = window.walletConnection.account();

  // Use near-api-js to perform the function call. Since this is using the JS SDK, 
  // the jsContract boolean must be set to true.
  const result = await account.functionCall({
    contractId: nearConfig.contractName,
    methodName: 'flipCoin',
    args: {
      "side": side
    },
    gas: "300000000000000",
    attachedDeposit: points == null ? parseNearAmount("0.1") : "0",
    jsContract: true,
  });
  
  return result
}

export async function get_points() {
  let account = window.walletConnection.account();

  // Use near-api-js to perform the call. Since this is using the JS SDK, 
  // the jsContract boolean must be set to true.
  const points = await account.viewFunction(
    nearConfig.contractName, 
    'viewPoints', 
    {
      "player": window.walletConnection.getAccountId()
    },
    { 
      jsContract: true
    }
  )
  
  return points
}