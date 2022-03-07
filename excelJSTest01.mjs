import ExcelJS from 'exceljs';
import fetch from 'node-fetch'

// function getData() {
//   const response = await fetch('https://ghibliapi.herokuapp.com/films')
//   const data = await response.json()
// }


const rowValues = [];
// rowValues[9] = new Date();

const response = await fetch('https://openapi.debank.com/v1/user/total_balance?id=0x3a0a36c16136d0eef403b049917b98dbac3f4463')
const data = await response.json()
var networth = data.total_usd_value
console.log('TOT :' + networth)
var networthBsc = data.chain_list[1].usd_value
var networthFantom = data.chain_list[4].usd_value
var networthAvax = data.chain_list[7].usd_value
console.log('BSC :' + networthBsc)
console.log('AVAX :' + networthAvax)
console.log('FTM :' + networthFantom)


rowValues[1] = new Date();
rowValues[2] = networth;
rowValues[3] = networthBsc;
rowValues[7] = networthFantom;
rowValues[9] = networthAvax;



const response2 = await fetch('https://openapi.debank.com/v1/user/complex_protocol_list?id=0x3a0a36c16136d0eef403b049917b98dbac3f4463&chain_id=bsc')
const data2 = await response2.json()
//var networthBscBeefyStatik = data2[0].portfolio_item_list[0].stats.net_usd_value
var networthBscBeefyOasis = data2[0].portfolio_item_list[0].stats.net_usd_value
var networthBscKalmar = data2[1].portfolio_item_list[0].stats.net_usd_value
//console.log('BeefyStatic :' + networthBscBeefyStatik)
console.log('BeefyOasis :' + networthBscBeefyOasis)
console.log('Kalmar :' + networthBscKalmar)

//rowValues[4] = networthBscBeefyStatik;
rowValues[5] = networthBscBeefyOasis;
rowValues[6] = networthBscKalmar;


const response3 = await fetch('https://openapi.debank.com/v1/user/complex_protocol_list?id=0x3a0a36c16136d0eef403b049917b98dbac3f4463&chain_id=ftm')
const data3 = await response3.json()
var networthFTMBeefyTomb = data3[0].portfolio_item_list[0].stats.net_usd_value
console.log('BeefyTomb :' + networthFTMBeefyTomb)

rowValues[8] = networthFTMBeefyTomb;


const response4 = await fetch('https://openapi.debank.com/v1/user/complex_protocol_list?id=0x3a0a36c16136d0eef403b049917b98dbac3f4463&chain_id=avax')
const data4 = await response4.json()
//var networthAvaxImpermaxUstUsdc = data4[1].portfolio_item_list[0].stats.net_usd_value
var networthAvaxBooFinanceLP = data4[0].portfolio_item_list[0].stats.net_usd_value
var networthAvaxBooFinanceStaked = data4[0].portfolio_item_list[1].stats.net_usd_value
//console.log('ImpermaxUSTUSDC :' + networthAvaxImpermaxUstUsdc)
console.log('BooFinanceAvax :' + networthAvaxBooFinanceLP)
console.log('BooFinanceStaked :' + networthAvaxBooFinanceStaked)


//rowValues[14] = networthAvaxBeefyUstUsdc;
rowValues[12] = networthAvaxBooFinanceLP;
rowValues[13] = networthAvaxBooFinanceStaked;


const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile('./PortCrypto02.xlsx')
var worksheet = workbook.getWorksheet('Foglio1');

var lastRow = worksheet.lastRow;
// console.log(lastRow.number)
// var getRowInsert = worksheet.getRow(++(lastRow.number));
// var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy")
var today = new Date();
var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
worksheet.addRow(rowValues).commit();
workbook.xlsx.writeFile('./PortCrypto02.xlsx');