import {performers, transactionList} from "./test-case";

interface Performer {
    name: string,
    weight: number,
    transactionList?: number[]
    count?: number
}

interface WorkerOutput {
    performerList: Performer[]
    lastPerformer?: Performer
    outputProportionList: number[]
}

export class WorkerClass {
    performerList: Performer[] = []
    transactionList: number[] = []

    transactionSumm: number = 0
    weightSumm: number = 0
    idealProportionList: number[] = []

    lastPerformer?: Performer = undefined
    outputProportionList: number[] = []

    constructor(performerList: Performer[], transactionList: number[]) {
        this.performerList = performerList.map(item => ({
            ...item,
            transactionList: item.transactionList || [],
            count: item.count || 0,
        }))
        this.transactionList = transactionList;

        this.weightSumm = this.performerList.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.weight;
        }, 0);

        if (this.weightSumm === 0) {
            throw new Error("weightSumm cant be 0")
        }

        this.idealProportionList = this.performerList.map(performer => performer.weight/this.weightSumm)
    }

    startCalculate(): WorkerOutput {
        this.transactionList.forEach(transaction => this.checkTransaction(transaction))
        this.calculateOutputCalculation()
        return {
            performerList: this.performerList,
            lastPerformer: this.lastPerformer,
            outputProportionList: this.outputProportionList,
        }
    }

    private checkTransaction(transaction: number) {
        this.transactionSumm = this.transactionSumm + transaction
        const performerDeltaList = this.performerList.map((performer, idx) => this.checkPerformerDelta(transaction, idx))
        const mostMatchPerformerIdx = this.findMostMatchPerformerIdx(performerDeltaList)
        this.updatePerformerByIndex(mostMatchPerformerIdx, transaction)
    }

    private checkPerformerDelta(transaction: number, performerIdx: number): number[] {
        return this.performerList.map((performer, idx) => {
            const count = idx === performerIdx ? (performer.count || 0) + transaction : (performer.count || 0)
            return count / this.transactionSumm
        })
    }

    private findMostMatchPerformerIdx(testArrays: number[][]): number {
        let mostMatchPerformerIdx = 0;
        let minDifference = Infinity;

        for (let i = 0; i < testArrays.length; i++) {
            const testArray = testArrays[i];
            let difference = 0;

            for (let j = 0; j < this.idealProportionList.length; j++) {
                difference += Math.pow(this.idealProportionList[j] - testArray[j], 2);
            }

            if (difference < minDifference) {
                minDifference = difference;
                mostMatchPerformerIdx = i;
            }
        }

        return mostMatchPerformerIdx;
    }

    private updatePerformerByIndex(performerIdx: number, transaction: number) {
        this.performerList = this.performerList.map((performer, idx) => {
            if (idx === performerIdx) {
                this.lastPerformer = performer
                return {
                    ...performer,
                    count: (performer.count || 0) + transaction,
                    transactionList: performer.transactionList ? [...performer.transactionList, transaction] : [transaction]
                }
            } else {
                return performer
            }
        })
    }

    private calculateOutputCalculation() {
        this.outputProportionList = this.performerList.map(item => (item.count || 0) / this.transactionSumm)
    }

}
