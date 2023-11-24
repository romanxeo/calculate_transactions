const sum = {
  "A": 0,
  "B": 0,
  "C": 0,
}

export const performers = [
  {
    name: 'A',
    weight: 10,
  },
  {
    name: 'B',
    weight: 40,
  },
  {
    name: 'C',
    weight: 50,
  }
]

export const transactionList = [100, 100, 100, 100, 100, 200, 100, 100, 100, 100, 10, 50, 1000, 100, 500, 50, 150, 200, 50, 100, 300, 150, 50, 200, 100, 300, 50, 100, 200, 150]


const dataset = [
  // all performers available
  {
    performers: [...performers],
    transactions: [100, 100, 100, 100, 100, 200, 100, 100, 100, 100, 10, 50, 1000, 100]
  },

  // only A and B performers are available:
  {
    performers: performers.filter((p) => ['A', 'B'].includes(p.name)),
    transactions: [500, 50, 150, 200, 50, 100, 300, 150, 50, 200, 100, 300, 50, 100, 200, 150, 5000, 2000, 500, 100, 10, 50, 3000, 534, 123, 50, 1234, 500, 600]
  },

  //  only C performer available:
  {
    performers: performers.filter((p) => ['C'].includes(p.name)),
    transactions: [500, 50, 150, 200, 50, 100, 300, 150, 50, 200, 100, 300, 50, 100]
  },

  // all performers available:
  {
    performers: [...performers],
    transactions: [200, 150, 5000, 2000, 500, 100, 10, 50, 3000, 534, 123, 50, 1234, 500, 600, 700, 1000, 500, 500, 500, 500, 500, 600, 700, 800, 1000, 5000, 500, 600, 100, 500, 250, 350, 500, 500, 500, 1000, 1500, 2500, 500, 500, 500, 300]
  },

  // only C and A performers are available:
  {
    performers: performers.filter((p) => ['C', 'A'].includes(p.name)),
    transactions: [500, 1000, 600, 750, 500, 5000, 1000]
  },

  // all performers available:
  {
    performers: [...performers],
    transactions: [500, 500, 500, 350, 1500, 2500, 500, 500, 500, 1500, 1000, 500, 500, 100, 50, 1000, 500, 750, 600, 300, 250, 400]
  },

  // no performers available:
  {
    performers: [], // -> should return null
    transactions: [500, 500, 500, 350, 1500, 2500, 500, 500, 500, 1500, 1000, 500, 500, 100, 50, 1000, 500, 750, 600, 300, 250, 400]
  }
]
