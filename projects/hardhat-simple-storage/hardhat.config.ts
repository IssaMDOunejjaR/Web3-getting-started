import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
	solidity: '0.8.7',
	defaultNetwork: 'hardhat',
	networks: {},
};

export default config;
