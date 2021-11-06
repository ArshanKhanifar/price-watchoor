import { anubis } from "./contracts/anubis";
import { Erc20Contract } from "simple-uniswap-sdk/dist/cjs/ABI/types/erc20-contract";
import { Contract } from "ethers";
import { weth } from "./contracts/weth";
import { anubis_weth_lp } from "./contracts/anubis_weth_lp";
import { vault_watchoor } from "./vault_watchoor";
import { token } from "./util";
import { morph } from "./contracts/morph";
import { mim } from "./contracts/mim";
import { morph_mim_lp } from "./contracts/morph_mim_lp";
import { lp_watchoor } from "./lp_watchoor";
import { exodia } from "./contracts/exodia";
import { dai } from "./contracts/dai";
import { exodia_dai_lp } from "./contracts/exodia_dai_lp";

const anubi_watchoor = async () => {
  const anubiToken = token(anubis) as unknown as Erc20Contract & Contract;
  const wethToken = token(weth) as unknown as Erc20Contract & Contract;
  const lpToken = token(anubis_weth_lp);
  return vault_watchoor(anubiToken, wethToken, lpToken);
};

const morph_watchoor = async () => {
  const morphToken = token(morph) as unknown as Erc20Contract;
  const mimToken = token(mim) as unknown as Erc20Contract;
  const lpToken = token(morph_mim_lp);
  return lp_watchoor(morphToken, mimToken, lpToken);
};

const exodia_watchoor = async () => {
  const exodiaToken = token(exodia) as unknown as Erc20Contract;
  const daiToken = token(dai) as unknown as Erc20Contract;
  const lpToken = token(exodia_dai_lp);
  return lp_watchoor(exodiaToken, daiToken, lpToken);
};
