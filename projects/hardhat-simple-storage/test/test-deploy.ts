import { ethers } from "hardhat";
import { SimpleStorage } from "../typechain-types";
import { assert } from "chai";

describe("SimpleStorage", function () {
	let simpleStorageFactory, simpleStorage: SimpleStorage;

	beforeEach(async function () {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

		simpleStorage = await simpleStorageFactory.deploy();
	});

	it("Should start with a favorite number of 0", async function () {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = "0";

		assert.equal(currentValue.toString(), expectedValue);
	});

	it("Should update when we call store", async function () {
		const expectedValue = "7";
		const transactionResponse = await simpleStorage.store(expectedValue);

		await transactionResponse.wait(1);

		const currentValue = await simpleStorage.retrieve();

		assert.equal(currentValue.toString(), expectedValue);
	});

	it("Should add a Person when we call addPerson", async function () {
		const expectedValue = "7";

		const transactionResponse = await simpleStorage.addPerson("issam", 7);

		await transactionResponse.wait(1);

		const currentValue = (
			await simpleStorage.nameToFavoriteNumber("issam")
		).toString();

		assert.equal(currentValue, expectedValue);
	});
});
