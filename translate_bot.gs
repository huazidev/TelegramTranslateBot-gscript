function doPost(e){
  var estringa = JSON.parse(e.postData.contents);
  var payload = identificar(estringa);
  var data = {
    "method": "post",
    "payload": payload
  }
  UrlFetchApp.fetch("https://api.telegram.org/bot(your bot token)/", data);
}

function identificar(e){
  if (e.message.text){
    var translateString ="11";
    var pattern2 = new RegExp("[A-Za-z]+");
  
    if(pattern2.test(e.message.text)){
      translateString = LanguageApp.translate(e.message.text, 'en', 'zh');
    } else {
      translateString = LanguageApp.translate(e.message.text, '', 'en');
    }
    
    var mensaje = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "reply_to_message_id": String(e.message.message_id),
      "text": translateString,
    } 
  }
  else if (e.message.sticker){
    var mensaje = {
      "method": "sendSticker",
      "chat_id": String(e.message.chat.id),
      "sticker": String(e.message.sticker.file_id)
    }
   }
  else if (e.message.photo){
    var array = e.message.photo;
    var text = array[1];
    var mensaje = {
      "method": "sendPhoto",
      "chat_id": String(e.message.chat.id),
      "photo": text.file_id
    }
   }
    else {
    var mensaje = {
      "method": "sendMessage",
      "chat_id": String(e.message.chat.id),
      "text": "Try other stuff"
    }
   }
  return mensaje
}

