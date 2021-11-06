import { BigNumber, Contract } from "ethers";
import { getReadable, populateDecimalsAndSymbol } from "./util";

export const lp_watchoor = async (
  token0: any,
  token1: any,
  lpToken: Contract
) => {
  await populateDecimalsAndSymbol(token0);
  await populateDecimalsAndSymbol(token1);
  console.log("listening...");
  lpToken.on(
    "Swap",
    async (
      from,
      in0: BigNumber,
      in1: BigNumber,
      out0: BigNumber,
      out1: BigNumber
    ) => {
      try {
        if (in0.isZero()) {
          const from = getReadable(token1, in1);
          const to = getReadable(token0, out0);
          const message =
            from +
            " " +
            token1.sym +
            " -> " +
            to +
            " " +
            token0.sym +
            " : " +
            from / to;
          //postMessageToTelegram(message);
          console.log("message", message);
        } else {
          const from = getReadable(token0, in0);
          const to = getReadable(token1, out1);
          const message =
            from +
            " " +
            token0.sym +
            " -> " +
            to +
            " " +
            token1.sym +
            " : " +
            to / from;
          //postMessageToTelegram(message);
          console.log("message", message);
        }
      } catch (e) {
        console.error(e);
      }
    }
  );
};
