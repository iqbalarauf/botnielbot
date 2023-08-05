// Panggil library telegram
var telegramToken = "GANTI-TOKEN-DISINI"; // Ganti dengan token bot Telegram Anda
var telegramUrl = "https://api.telegram.org/bot" + telegramToken;

// Fungsi untuk mengirim pesan ke bot Telegram
function sendText(chatid,text,replymarkup){
var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatid),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(replymarkup)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + telegramToken + '/', data);
}


// Fungsi untuk mengambil jokes acak
function getRandomJokes() {
  var spreadsheetId = "Spreadsheet-ID"; // Ganti dengan ID spreadsheet Anda
  var sheetName = "Sheet"; // Ganti dengan nama lembar kerja Anda
  var columnLetter = "A"; // Ganti dengan huruf kolom yang ingin Anda ambil (misalnya, "A", "B", "C", dst.)

  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(columnLetter + "1:" + columnLetter + lastRow);
  var values = range.getValues();

  // Filter nilai yang tidak valid (kosong)
  var filteredValues = values.filter(function(value) {
    return value[0] !== "";
  });

  // Mendapatkan data acak dari nilai-nilai yang tersisa
  var randomData = filteredValues[Math.floor(Math.random() * filteredValues.length)][0];

  return randomData;
}

// Fungsi untuk mengambil quotes acak
function getRandomQuote() {
  var spreadsheetId = "Spreadsheet-ID"; // Ganti dengan ID spreadsheet Anda
  var sheetName = "Sheet"; // Ganti dengan nama lembar kerja Anda
  var columnLetter = "A"; // Ganti dengan huruf kolom yang ingin Anda ambil (misalnya, "A", "B", "C", dst.)

  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(columnLetter + "1:" + columnLetter + lastRow);
  var values = range.getValues();

  // Filter nilai yang tidak valid (kosong)
  var filteredValues = values.filter(function(value) {
    return value[0] !== "";
  });

  // Mendapatkan data acak dari nilai-nilai yang tersisa
  var randomData = filteredValues[Math.floor(Math.random() * filteredValues.length)][0];

  return randomData;
}

// Fungsi utama untuk menerima dan memproses permintaan dari bot Telegram
function doPost(e) {
  var stringJson = e.postData.getDataAsString();
  var updates = JSON.parse(stringJson);
 
    if(updates.message.text === "/jokes"){
      sendText(updates.message.chat.id,getRandomJokes());
    }
    if(updates.message.text === "/quote"){
      sendText(updates.message.chat.id,getRandomQuote());
    }
    if(updates.message.text === "/start"){
      sendText(updates.message.chat.id, "Selamat datang. Gunakan '/jokes' untuk mendapatkan jokes random dan '/quote' untuk quote ala Oniel");
    }
    if(updates.message.text === "/input"){
      sendText(updates.message.chat.id, "Terima kasih atas kesediaannya untuk berkontribusi terhadap BotOniel. Teman-teman bisa ikut berpartisipasi untuk input jokes melalui link ini (--MASUKKAN LINK GFORM--). \n \n Jokes yang masuk akan tetap diverifikasi, jika diterima maka akan dimasukkan ke database bot. Untuk progres jokes bisa dilihat di link ini (--MASUKKAN LINK SPREADSHEET HASIL FORM--). Terima kasih");
    }
}

// Test Function berjalan atau tidak
function testGetRandom() {
  var randomData = getRandomQuote(); // Dapat diganti dengan function yang lain
  Logger.log(randomData);
}