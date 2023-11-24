import {WorkerClass} from "./worker";
import {performers, transactionList} from "./test-case";

const worker = new WorkerClass(performers, transactionList)
const result = worker.startCalculate()

console.log("Result")
console.log(result)
