import {ethers} from "ethers";
import {AVAX_PROVIDER} from "./constants";
import {time} from "./contracts/time";
import {mim_avax} from "./contracts/mim_avax";
import {time_mim_lp} from "./contracts/time_mim_lp";
import {token,} from "./util";
import {globalProvider} from "./provider";
import {lp_watchoor} from "./lp_watchoor";

const time_watchoor = async () => {
  const timeToken = token(time);
  const mimToken = token(mim_avax);
  const lpToken = token(time_mim_lp);
  return lp_watchoor(timeToken, mimToken, lpToken);
};

const main = async () => {
  globalProvider.setProvider(
    new ethers.providers.JsonRpcProvider(AVAX_PROVIDER)
  );
  return time_watchoor();
};

main().then(() => {});
