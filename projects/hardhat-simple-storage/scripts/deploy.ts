import { ethers, run, network } from "hardhat";

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);

	console.log("Deploying Contract ...");

	const simpleStorage = await SimpleStorageFactory.deploy();

	await simpleStorage.deployed();

	console.log(`Deployed contract at: ${simpleStorage.address}`);

	if (network.name !== "hardhat" && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deployTransaction.wait(6);

		await verify(simpleStorage.address, []);
	}

	const currentValue = await simpleStorage.retrieve();

	console.log(`Current value: ${currentValue}`);

	const transactionResponse = await simpleStorage.store(7);

	await transactionResponse.wait(1);

	const updatedValue = await simpleStorage.retrieve();

	console.log(`Updated value: ${updatedValue}`);
}

async function verify(contractAddress: string, args: any) {
	console.log("Verifying contract...");

	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		if ((error as any).message.toLowerCase().includes("already verified")) {
			console.log("Already Verified!");
		} else {
			console.log(error);
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);

		process.exit(1);
	});
