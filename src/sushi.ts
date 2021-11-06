import { ETH, UniswapPair } from "simple-uniswap-sdk";
import { POLYGON_PROVIDER } from "./constants";

const bct = "0x2f800db0fdb5223b3c3f354886d907a671414a7f";

export const sushi = async () => {
  const pair = new UniswapPair({
    fromTokenContractAddress: ETH.POLYGON().contractAddress,
    toTokenContractAddress: bct,
    ethereumAddress: "0x8b782e260a0A8eA4C7F9Ca374D78016ea40C976b",
    ethereumProvider: POLYGON_PROVIDER,
  });
  console.log("pair baby", pair);
};
