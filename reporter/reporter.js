var fs = require('fs');

const generateReport = (testResults, results) => {
    let html = ""

    const resultsByFixture = {}
    testResults.map(result => {
        resultsByFixture.hasOwnProperty(result.ancestorTitles) ? null : resultsByFixture[result.ancestorTitles] = []        
        resultsByFixture[result.ancestorTitles].push(result)
    })

    let date = new Date(results.startTime)

    const convertMs = (ms) => {
        let seconds = Math.floor(ms / 1000)
        seconds < 10 ? seconds = "0" + seconds : null
        return seconds
    }

    const head = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdn.rawgit.com/drvic10k/bootstrap-sortable/ff650fd1/Contents/bootstrap-sortable.css">
            <link rel="stylesheet" href="./css/styles.css">
            
            <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
            <script src="https://cdn.rawgit.com/drvic10k/bootstrap-sortable/ff650fd1/Scripts/bootstrap-sortable.js"></script>
            <script src="https://cdn.rawgit.com/drvic10k/bootstrap-sortable/ff650fd1/Scripts/moment.min.js"></script>
        </head>
    `

    const summary = `
        <body>
            <div class="container">
                <div class="summary">
                    <h2>Summary</h2>
                    <span><b>start time: </b>${date.toLocaleString()}</span>
                    <span><b>executed tests: </b>${results.numTotalTests}</span>
                    <span><b>failed tests: </b>${results.numFailedTests}</span>
                </div>
    `

    const reportTableHead = `
                <table class="table table-condensed" style="border-collapse:collapse;">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fixture</th>
                            <th>Test Name</th>
                            <th>Duration</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
    `

    const reportTableClosingTags = `
                    </tbody>
                </table>
    `

    const closingTags = `
            </div>
        </body>
    </html>
    `

    html += head
    html += summary

    
    Object.keys(resultsByFixture).map(name => {
        html += reportTableHead

        resultsByFixture[name].map((result, i) => {
            let reportTablePassed = ""
            let reportTableFailed = ""

            let duration = convertMs(result.duration)

            reportTablePassed = `
                        <tr class="passed">
                            <td>${i + 1}</td>
                            <td>${name}</td>
                            <td>${result.title}</td>
                            <td>${duration}s</td>
                            <td>${result.status}</td>
                        </tr>
            `

            reportTableFailed = `
                        <tr data-toggle="collapse" data-target="#${name.split(' ').join('') + i}" class="accordion-toggle failed">
                            <td>${i + 1}</td>
                            <td>${name}</td>
                            <td>${result.title}</td>
                            <td>${duration}s</td>
                            <td>${result.status}</td>
                        </tr>
                        <tr>
                            <td colspan="6" class="hiddenRow">
                                <div class="accordion-body collapse" id="${name.split(' ').join('') + i}">
                                    <img src="tests/screenshots/${result.title}-diff.png" class="img-responsive">
                                </div>
                            </td>
                        </tr>
            `

            result.status === "passed" ? html += reportTablePassed : html += reportTableFailed
        })

        html += reportTableClosingTags
    })
    
    html += closingTags

    fs.writeFile("./report.html", html, function(err) {
        if(err) {
            console.log('something went wrong')
        }
    })
}

class Reporter {
    constructor(globalConfig, options) {
      this._globalConfig = globalConfig;
      this._options = options;
    }
  
    onRunComplete(contexts, results) {
      generateReport(results.testResults[0].testResults, results)
    }
  }
  
  module.exports = Reporter;