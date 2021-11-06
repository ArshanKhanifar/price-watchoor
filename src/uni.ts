import { ChainId, Fetcher, Route, Token, WETH } from "@uniswap/sdk";

const uni =async () => {
  const DAI = new Token(
    ChainId.MAINNET,
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    18
  );
  const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
  const route = new Route([pair], WETH[DAI.chainId]);
  console.log("price", route.midPrice.toSignificant(6));
}

