const puppeteer = require('puppeteer')
const ScreenshotTester = require('puppeteer-screenshot-tester')
const testData = require('./testData.json') 

/* ------------- FOOTBALL LIVE VIEW ------------- */
describe('Football live view - big screen', () => {
    let originalTimeout
      
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000
    })
    
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    testData[0].football.liveView.map(test => {
        it(`${test.name}-bigScreen`, async () => {
            const tester = await ScreenshotTester(0.5, false, false, [[1850,365,500,1000]], {
                transparency: 0.5,
                errorType: 'flat'
            })
        
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 2560, height: 1080})
            await page.goto(`${test.url}`, { waitUntil: 'networkidle0' })

            await page.click('div.column.p100.center > a')
            
            const result = await tester(page, `screenshots/${test.name}-bigScreen`, {
                fullPage: true,
                saveNewImageOnError: true
            })
        
            await browser.close()
            
            expect(result).toBe(true)
        })  
    })
})

describe('Football live view - desktop', () => {
    let originalTimeout
      
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000
    })
    
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    testData[0].football.liveView.map(test => {
        it(`${test.name}-desktop`, async () => {
            const tester = await ScreenshotTester(0.5, false, false, [[1450,365,500,1000]], {
                transparency: 0.5,
                errorType: 'flat'
            })
        
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 1920, height: 1080})
            await page.goto(`${test.url}`, { waitUntil: 'networkidle0' })
            await page.click('div.column.p100.center > a')
            
            const result = await tester(page, `screenshots/${test.name}-desktop`, {
                fullPage: true,
                saveNewImageOnError: true
            })
        
            await browser.close()
            
            expect(result).toBe(true)
        })  
    })
})

describe('Football live view - tablet', () => {
    let originalTimeout
      
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000
    })
    
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    testData[0].football.liveView.map(test => {
        it(`${test.name}-tablet`, async () => {
            const tester = await ScreenshotTester(0.5, false, false, [[250,365.05684,500,500]], {
                transparency: 0.5,
                errorType: 'flat'
            })
        
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 765, height: 1080})
            await page.goto(`${test.url}`, { waitUntil: 'networkidle0' })
            await page.click('div.column.p100.center > a')
            
            const result = await tester(page, `screenshots/${test.name}-tablet`, {
                fullPage: true,
                saveNewImageOnError: true
            })
        
            await browser.close()
            
            expect(result).toBe(true)
        })  
    })
})

describe('Football live view - mobile', () => {
    let originalTimeout
      
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000
    })
    
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    testData[0].football.liveView.map(test => {
        it(`${test.name}-mobile`, async () => {
            
        
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 639, height: 1080})
            await page.goto(`${test.url}`, { waitUntil: 'networkidle0' })
            
            await page.click('#mobilePage > div > inline-collapser-comp:nth-child(3) > div > div.collapser-tab > button')
            await page.click('#mobilePage > div > inline-collapser-comp:nth-child(4) > div > div.collapser-tab > button')
            await page.click('#mobilePage > div > collapser-comp:nth-child(5) > div > div.collapser-tab > button')
            await page.click('#mobilePage > div > collapser-comp:nth-child(6) > div > div.collapser-tab > button')

            await page.waitForSelector(".todaylive-container", {timeout: 5000})
            let element = await page.$(".todaylive-container")
            let bb = await element.boundingBox()

            const tester = await ScreenshotTester(0.5, false, false, [[bb.x,bb.y,bb.width,bb.height]], {
                transparency: 0.5,
                errorType: 'flat'
            })

            const result = await tester(page, `screenshots/${test.name}-mobile`, {
                fullPage: true,
                saveNewImageOnError: true
            })
        
            await browser.close()
            
            expect(result).toBe(true)
        })  
    })
})

/* ------------- FOOTBALL RESULTS VIEW ------------- */
describe('Football results view - big screen', () => {
    let originalTimeout
      
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000
    })
    
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    testData[0].football.resultsView.map(test => {
        it(`${test.name}-bigScreen`, async () => {
            const tester = await ScreenshotTester(0.5, false, false, [[1850,365,500,1000]], {
                transparency: 0.5,
                errorType: 'flat'
            })
        
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 2560, height: 1080})
            await page.goto(`${test.url}`, { waitUntil: 'networkidle0' })
            
            const result = await tester(page, `screenshots/${test.name}-bigScreen`, {
                fullPage: true,
                saveNewImageOnError: true
            })
        
            await browser.close()
            
            expect(result).toBe(true)
        })  
    })
})

describe('Football results view - desktop', () => {
    let originalTimeout
      
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000
    })
    
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    testData[0].football.resultsView.map(test => {
        it(`${test.name}-desktop`, async () => {
            const tester = await ScreenshotTester(0.5, false, false, [[1450,365,500,1000]], {
                transparency: 0.5,
                errorType: 'flat'
            })
        
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 1920, height: 1080})
            await page.goto(`${test.url}`, { waitUntil: 'networkidle0' })
            
            const result = await tester(page, `screenshots/${test.name}-desktop`, {
                fullPage: true,
                saveNewImageOnError: true
            })
        
            await browser.close()
            
            expect(result).toBe(true)
        })  
    })
})

describe('Football results view - tablet', () => {
    let originalTimeout
      
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000
    })
    
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    testData[0].football.resultsView.map(test => {
        it(`${test.name}-tablet`, async () => {
            const tester = await ScreenshotTester(0.5, false, false, [[250,365.05684,500,500]], {
                transparency: 0.5,
                errorType: 'flat'
            })
        
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 765, height: 1080})
            await page.goto(`${test.url}`, { waitUntil: 'networkidle0' })
            
            const result = await tester(page, `screenshots/${test.name}-tablet`, {
                fullPage: true,
                saveNewImageOnError: true
            })
        
            await browser.close()
            
            expect(result).toBe(true)
        })  
    })
})

describe('Football results view - mobile', () => {
    let originalTimeout
      
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000
    })
    
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    testData[0].football.resultsView.map(test => {
        it(`${test.name}-mobile`, async () => {
            
        
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 639, height: 1080})
            await page.goto(`${test.url}`, { waitUntil: 'networkidle0' })

            const tester = await ScreenshotTester(0.5, false, false, [], {
                transparency: 0.5,
                errorType: 'flat'
            })

            const result = await tester(page, `screenshots/${test.name}-mobile`, {
                fullPage: true,
                saveNewImageOnError: true
            })
        
            await browser.close()
            
            expect(result).toBe(true)
        })  
    })
})
  
