import { ethers } from 'hardhat';

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		'SimpleStorage'
	);

	console.log('Deploying Contract ...');

	const simpleStorage = await SimpleStorageFactory.deploy();

	await simpleStorage.deployed();

	console.log(`Deployed contract at: ${simpleStorage.address}`);
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);

		process.exit(1);
	});
