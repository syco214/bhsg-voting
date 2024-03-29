import { useState } from 'react'
import axios from 'axios'
import _ from 'lodash'

const GetTokenUrl = 'https://public-api.solscan.io/account/tokens'
const GetMetaDataUrl = 'https://api.all.art/v1/solana/'

const useConnectWallet = () => {
  const [metaData, setMetaData]  = useState(null)
  const [metaDataList, setMetaDataList]  = useState(null)
  const [tokenInfo, setTokenInfo] = useState([])

  const loadMetaData = async (publicKey) => {
    try {
      const info = await axios.get(GetTokenUrl, {
        params: { account: publicKey },
      })
      // setAccountCnt(info.data.length)
      const data = _.filter(info.data, each=>{
        return each.tokenAmount.amount !== "0"
      })
      setTokenInfo(data)
      _.map(data, async (each) => {
        const temp = await axios.get(GetMetaDataUrl + each.tokenAddress)
        setMetaData(temp)
        //   if(!_.find(metaList, {Pubkey: _.get(metadata, "data.Pubkey", "")})){
        // metaList.push(metadata.data)
        //   }
      })
    } catch (err) {}
  }

  const loadMetadataByWallet = async (publicKey) => {
    try {
      const info = await axios.get(GetTokenUrl, {
        params: { account: publicKey },
      })
      // setAccountCnt(info.data.length)
      const data = _.filter(info.data, each=>{
        return each.tokenAmount.amount !== "0"
      })
      _.map(data, async (each) => {
        const temp = await axios.get(GetMetaDataUrl + each.tokenAddress)
        setMetaData(temp)
        //   if(!_.find(metaList, {Pubkey: _.get(metadata, "data.Pubkey", "")})){
        // metaList.push(metadata.data)
        //   }
      })
    } catch (err) {}
  }

  const loadTokenAddressList = async (publicKey) => {
    try {
      const info = await axios.get(GetTokenUrl, {
        params: { account: publicKey },
      })
      // setAccountCnt(info.data.length)
      setTokenInfo(_.filter(info.data, each=>{
        return each.tokenAmount.amount !== "0"
      }))
    } catch (err) {}
  }

  const loadTokenInfo = async (tokenAddr) => {
    const res = [];
    for(let i = 0; i < tokenAddr.length; i++) {
      const temp = await axios.get(GetMetaDataUrl + tokenAddr[i])
      res.push(temp.data);
    }
    setMetaDataList(res);
    
  }

  return { metaData, metaDataList, loadMetaData, tokenInfo, loadTokenAddressList, loadTokenInfo, setMetaData, setMetaDataList, loadMetadataByWallet }
}

export default useConnectWallet
