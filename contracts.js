import Web3 from "web3";

const contract = require("truffle-contract");
const kiitos = require("./build/contracts/HeartBankToken.json");
const boxOffice = require("./build/contracts/BoxOffice.json");
const registry = require("./build/contracts/BoxOfficeRegistry.json");
const oracle = require("./build/contracts/BoxOfficeOracle.json");

const provider = typeof window !== "undefined" && typeof window.web3 !== "undefined" ? 
    window.web3.currentProvider : new Web3.providers.HttpProvider("http://localhost:9545"); 
    // https://rinkeby.infura.io/DPHGLx2mBJeWsuDv1jFV

const Kiitos = contract(kiitos);
const BoxOffice = contract(boxOffice);
const Registry = contract(registry);
let Oracle = contract(oracle);

Kiitos.setProvider(provider);
BoxOffice.setProvider(provider);
Registry.setProvider(provider);
Oracle.setProvider(provider);

const getCurrentOracle = async (Oracle) => {
    const registry = await Registry.deployed();
    const oracle = await registry.currentOracle();
    return Oracle.at(oracle);
}

export default new Web3(provider);
export { Kiitos, BoxOffice, Oracle, getCurrentOracle };