
const ExtractAdNetworkRevenue = (input, api) => new Promise((res, rej) => {
  ...
})

const config = {
  // each task is defined here as an either object or
  // a function that accepts input and api

  // input will be an object with same keys as the
  // dependenies' names and the values will be what the
  // dependencies returned

  // config will contain the whole task definition but
  // without the runtime itself

  maxProcesses: 15,

  // milliseconds
  retryDelay: 2000,

  // will be evaluated
  retryPattern: 'retryPattern',

  // default config that'll be passed to each task
  api: 'api'

  tasks: {
    makePrediction: {
      // what to exec
      runtime: MakeNextDayPrediction,

      // where to post output when this task is the entry point
      output: 'displayOutputOnBigBeautifulScreen',

      // when to execute. 'once' means execute right away one time.
      // accepts 'once' or CRON string
      schedule: 'once',

      // number of retries for a task to be considered faulty and stopped
      // 0 is infinity
      retries: 5,

      // how long should normal execution take, milliseconds
      limit: 20000,

      // will be applied to process runtime
      env: {
        PATH: '...'
      }
    },
    checkHistory: {
      // only runtime is defined. Not recommended but valid
      runtime: CheckWeeklyHistoricalData
    },

    // ...or just the function. The proper way.
    combineSources: CombineDataSources,

    convertCurrency: PerformCurrencyConversions,
    transformSpreadsheetData: TransformSpreadsheetData,
    transformJSONData: TransformJSONData,
    getRates: {
      runtime: GetDailyConversionRates,

      // schedule tables with different configs
      schedule: {
        '0 * * * *': { DB_PATH: '127.0.0.1:8080/staging' },
        'once': { DB_PATH: '127.0.0.1:8080/prod' }
      }
    },
    fetchRates: 'WaitForConversionRates',
    getAdRevenue: 'ExtractAdNetworkRevenue',
    getRevenueA: 'ExtractAppStoreARevenue',
    getRevenueB: 'ExtractAppStoreBRevenue',
    getRevenueC: 'ExtractAppStoreCRevenue',
  },

  // deps is not a program. It's just the dependency
  // graph that shows what depends on what.

  // each task still may be executed with it's own 'schedule'
  deps:
    ['makePrediction'
      ['checkHistory'
        ['combineSources'
          ['transformSpreadsheetData' 'getAdRevenue']
          ['convertCurrency'
            ['transformJSONData' 'getRevenueA' 'getRevenueB' 'getRevenueC']
            ['getRates' 'fetchRates']]]]]
}

const moduleConfig = 'python app.py' // 'node index.js' etc...



// <makePrediction>
//   <checkHistory>
//     <combineSources>
//
//       <transformSpreadsheetData>
//         <ExtractAdNetworkRevenue />
//       </transformSpreadsheetData>
//
//       <convertCurrency>
//
//         <transformJSONData>
//           <getRevenueA />
//           <getRevenueB />
//           <getRevenueC />
//         </transformJSONData>
//
//         <getRates>
//           <fetchRates />
//         </getRates>
//
//       </convertCurrency>
//
//     </combineSources>
//   </checkHistory>
// </makePrediction>
