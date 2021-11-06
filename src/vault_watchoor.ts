import { BigNumber, Contract } from "ethers";
import {
  getReadable,
  populateDecimalsAndSymbol,
  postMessageToTelegram,
} from "./util";

export const vault_watchoor = async (
  token0: any,
  token1: any,
  vault: Contract
) => {
  populateDecimalsAndSymbol(token0);
  populateDecimalsAndSymbol(token1);
  const address0 = token0.address.toLowerCase();
  const address1 = token1.address.toLowerCase();
  const processSwap = async (
    poolId: string,
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumber,
    amountOut: BigNumber
  ) => {
    tokenIn = tokenIn.toLowerCase();
    tokenOut = tokenOut.toLowerCase();

    if (
      !(
        (tokenIn === address0 && tokenOut === address1) ||
        (tokenIn === address1 && tokenOut === address0)
      )
    ) {
      return;
    }
    const inToken = tokenIn === address0 ? token0 : token1;
    const outToken = tokenOut === address0 ? token0 : token1;

    const inReadable = getReadable(inToken, amountIn);
    const outReadable = getReadable(outToken, amountOut);

    const wethPrice = 4400;
    const total = (tokenIn === address0 ? outReadable : inReadable) * wethPrice;
    const price =
      (tokenIn === address0
        ? outReadable / inReadable
        : inReadable / outReadable) * wethPrice;
    const message = `${inReadable} ${inToken.sym} -> ${outReadable} ${
      outToken.sym
    } - price: ${price.toFixed(4)} total: $${total.toFixed(2)}`;
    postMessageToTelegram(
      (total > 200e3 ? "LARGE TRANSACTION: " : "") + message
    );
  };
  console.log("listening");
  vault.on("Swap", processSwap);
};
