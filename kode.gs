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
  var startRow = 2; // Baris pertama dengan data (hindari header)
  var numRandomRows = 1; // Jumlah baris acak yang ingin Anda pilih
  var selectedColumns = [1, 2, 3]; // Indeks kolom yang ingin ditampilkan (misal: kolom B dan C)
  var dateColumnIndex = 2; // Indeks kolom tanggal (misal: kolom B)
  var outputDateFormat = "dd MMM yyyy"; // Format tanggal yang diinginkan
  
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var numRows = lastRow - startRow + 1;

  if (numRows <= 0 || numRandomRows <= 0) {
    return [];
  }

  var randomRowIndex = Math.floor(Math.random() * numRows) + startRow;
  var randomRowData = sheet.getRange(randomRowIndex, 1, 1, sheet.getLastColumn()).getValues()[0];

  var selectedRowData = selectedColumns.map(function(columnIndex) {
    return randomRowData[columnIndex - 1]; // Mengganti indeks nol berdasarkan kolom A (indeks 1)
  });

  var dateValue = randomRowData[dateColumnIndex - 1];
  var formattedDate = Utilities.formatDate(dateValue, "GMT", outputDateFormat);
  selectedRowData[dateColumnIndex - 1] = formattedDate;

  return selectedRowData[0] + "\n" + "(" + selectedRowData[1] + " - " + selectedRowData[2] + ")";
}

// Fungsi untuk mengambil quotes acak
function getRandomQuote() {
  var spreadsheetId = "Spreadsheet-ID"; // Ganti dengan ID spreadsheet Anda
  var sheetName = "Sheet"; // Ganti dengan nama lembar kerja Anda
  var startRow = 2; // Baris pertama dengan data (hindari header)
  var numRandomRows = 1; // Jumlah baris acak yang ingin Anda pilih
  var selectedColumns = [1, 2, 3]; // Indeks kolom yang ingin ditampilkan (misal: kolom B dan C)
  var dateColumnIndex = 2; // Indeks kolom tanggal (misal: kolom B)
  var outputDateFormat = "dd MMM yyyy"; // Format tanggal yang diinginkan
  
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var numRows = lastRow - startRow + 1;

  if (numRows <= 0 || numRandomRows <= 0) {
    return [];
  }

  var randomRowIndex = Math.floor(Math.random() * numRows) + startRow;
  var randomRowData = sheet.getRange(randomRowIndex, 1, 1, sheet.getLastColumn()).getValues()[0];

  var selectedRowData = selectedColumns.map(function(columnIndex) {
    return randomRowData[columnIndex - 1]; // Mengganti indeks nol berdasarkan kolom A (indeks 1)
  });

  var dateValue = randomRowData[dateColumnIndex - 1];
  var formattedDate = Utilities.formatDate(dateValue, "GMT", outputDateFormat);
  selectedRowData[dateColumnIndex - 1] = formattedDate;

  return selectedRowData[0] + "\n" + "(" + selectedRowData[1] + " - " + selectedRowData[2] + ")";
}

// Fungsi untuk mendapatkan data berupa link video YouTube acak dari spreadsheet
function getRandomVideoUrl() {
  var spreadsheetId = "Spreadsheet-ID"; // Ganti dengan ID spreadsheet Anda
  var sheetName = "Sheet"; // Ganti dengan nama lembar kerja Anda
  var columnLetter = "E"; // Ganti dengan huruf kolom yang ingin Anda ambil (misalnya, "A", "B", "C", dst.)

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

// Fungsi untuk mencari jokes Oniel
function cariJokes(query) {
  var spreadsheetId = "Spreadsheet-ID"; // Ganti dengan ID lembar kerja Anda
  var sheetName = "Sheet"; // Ganti dengan nama lembar kerja Anda
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName(sheetName);
  var range = sheet.getRange("A2:D");
  var values = range.getValues();

  var searchResults = [];
  for (var i = 0; i < values.length; i++) {
    if (values[i][0].toString().toLowerCase().includes(query.toLowerCase())) {
      searchResults.push(values[i][0] + " (" + values[i][2] + " - " + values[i][1].toLocaleDateString('id-ID', { year:"numeric", month:"long", day: 'numeric'}) + ")"); // Output tanggal menggunakan format 21 Agustus 2023"
    }
  }

  var resultMessage = "Hasil pencarian dengan kata kunci '" + query + "':\n";
  resultMessage += searchResults.join("\n");

  return resultMessage;
}

// Fungsi mengirim Broadcast Message (tidak perlu dideploy, cukup run function ini melalui Apps Script)
function kirimBroadcastTelegram() {
  var spreadsheetId = "Spreadsheet-ID"; // Ganti dengan ID lembar kerja Anda
  var sheetName = "Nama-Sheet"; // Ganti dengan nama lembar kerja Anda
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName(sheetName);
  var range = sheet.getRange("A:A"); // Ganti dengan kolom yang diinginkan
  var data = range.getValues();

  Logger.log(data);

  for (var i = 0; i < data.length; i++) {
    var chatId = data[i][0]; // Asumsikan chat ID ada di kolom pertama (kolom A)
    var pesan = "Tulis Pesan di sini"; // Ganti pesan di sini
    sendText(chatId, pesan);
  }
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
      sendText(updates.message.chat.id, "Selamat datang. Gunakan '/help' untuk petunjuk penggunaan bot ini");
    }
    if(updates.message.text === "/input"){
      sendText(updates.message.chat.id, "Terima kasih atas kesediaannya untuk berkontribusi terhadap Bot ini"); // anda dapat mengganti pesannya di sini
    }
    if(updates.message.text === "/video"){
      sendText(updates.message.chat.id, getRandomVideoUrl());
    }
    if (updates.message.text.startsWith("/cari")) { // Memeriksa apakah pesan adalah perintah /cari
      var query = updates.message.text.substring(6).trim(); // Mengambil teks setelah /cari
      if (query) {
        sendText(updates.message.chat.id, cariJokes(query));
      } else {
        var response = "Mohon berikan kata kunci pencarian setelah /cari.";
        sendTelegramMessage(chat_id, response);
      }
    }
    if(updates.message.text === "/help"){
      sendText(updates.message.chat.id, "Tulis Pesanmu di sini"); // Pesan bisa ditulis
    }

  var data = JSON.parse(e.postData.contents);
  var chatId = data.message.chat.id;
  
  // Tentukan nama sheet yang ingin Anda gunakan untuk menyimpan chat_id
  var sheetName = "Nama-Sheet";
  var spreadsheet = Spreadsheet-ID");
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName); // Buat sheet jika belum ada
    sheet.appendRow(["Timestamp", "Chat ID"]); // Header kolom
  }
  
  // Simpan chat_id dalam sheet
  sheet.appendRow([new Date(), chatId]);
  
  var telegramUrl = "https://api.telegram.org/bot" + telegramToken + "/sendMessage";

  var payload = {
    "method": "sendMessage",
    "chat_id": chatId,
    "text": text
  };

  var options = {
    "method": "post",
    "payload": payload
  };

  UrlFetchApp.fetch(telegramUrl, options);
}

// Test Function berjalan atau tidak
function testGetRandom() {
  var randomData = getRandomQuote(); // Dapat diganti dengan function yang lain
  Logger.log(randomData);
}
