import { BigNumber, Contract, ethers } from "ethers";
import axios from "axios";
import { globalProvider } from "./provider";

export const populateDecimalsAndSymbol = async (token: any) => {
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  token.sym = symbol;
  token.dec = decimals;
};

export const token = ({ address, abi }: any): Contract => {
  return new ethers.Contract(address, abi, globalProvider.provider!);
};

export const getReadable = (token: any, amount: BigNumber) => {
  const moreDigits = 1e5;
  const base = BigNumber.from("1" + "0".repeat(token.dec));
  const base10 = amount.mul(moreDigits).div(base);
  console.log("base10", base10.toString());
  if (base10.toString().length > 10) {
    return base10.div(moreDigits).toNumber();
  }
  return base10.toNumber() / moreDigits;
};

const BOT_TOKEN = "";
const CHAT_ID = "";

export const postMessageToTelegram = async (message: string) => {
  console.log("message", message);
  const chatId = CHAT_ID;
  const MESSAGE_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const url = `${MESSAGE_API}?chat_id=${chatId}&text=${message}&parse_mode=HTML`;
  try {
    await axios.get(url);
  } catch (e) {
    console.error("error sending telegram message", e);
  }
};
