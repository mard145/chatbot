const wppconnect = require('@wppconnect-team/wppconnect');
const path = require('path');
const fs = require("fs");
const base64 = fs.readFileSync(path.join(__dirname, '4.jpeg'),"base64");
const puppeteer = require('puppeteer');
const axios = require('axios');
const apiKey = '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'
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);


wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));



function start(client) {

//   client.waitForQrCodeScan().then((qr)=>{
//     client.sendText('5524988840637@c.us', qr).then((qqr)=>{
//         console.log(qqr)
//     }).catch(err=>{
//       console.log(err)
//     })
// })
// .catch(err=>{
//   console.log(err)
// })
client.getWAVersion().then((version)=>{
  console.log('version: ',version)
})

    client.onMessage((message) => {  

       console.log(message);
       console.log(message.chatId);
       console.log(message.from);
      if(message.body == 'Já é nosso Cliente?' && message.isGroupMsg == false){
        client
        .sendFile(message.chatId, `data:image/jpeg;base64,${base64}`, {
            useTemplateButtons: true, // False for legacy
            buttons: [
              {
                id: 'suporte',
                text: 'Suporte'
              },
              {
                id: 'Mudança de Assinatura',
                text: 'Mudança de Assinatura'
              },
              {
                url: 'https://api.whatsapp.com/send?phone=5524998698812&text=%F0%9F%91%8B%20Ol%C3%A1%20agente%20da%204ALL%20TV%20estou%20precisando%20de%20um%20atendimento.',
                text: 'Falar com um(a) atendente'
              }
            ],
            title: 'Suporte para Assinantes', // Optional
            // footer: '4ALL TV. Estamos sempre prontos para atendê-lo(a)' // Optional
         })
      }else if(message.body == 'Ven1das' && message.isGroupMsg == false){
        client
        .sendMessage(message.chatId, `data:image/jpeg;base64,${base64}`, {
            useTemplateButtons: true, // False for legacy
            buttons: [ 
              {
                id: 'price',
                text: 'Assinaturas Detalhadas'
              },
              {
                id: 'test',
                text: 'Teste agora mesmo!'
              },
              {
                url: 'https://api.whatsapp.com/send?phone=5524998698812&text=%F0%9F%91%8B%20Ol%C3%A1%20agente%20da%204ALL%20TV%20estou%20precisando%20de%20um%20atendimento.',
                text: 'Falar com um(a) atendente'
              }
            ],
            title: 'Assinaturas', // Optional
            footer: '4ALL TV. Estamos sempre prontos para atendê-lo(a) 🎧🎧🎧' // Optional
         })
      }  else if(message.body == 'Assinaturas Detalhadas' && message.isGroupMsg == false){
         client
  .sendImage(
    message.chatId,
    path.join(__dirname, 'tabela.jpeg'),
    'TABELA DE PREÇOS',
    'TABELA DE PREÇOS'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
      } else if(message.body == 'Suporte' && message.isGroupMsg == false){
        client
        .sendFile(message.chatId, `data:image/jpeg;base64,${base64}`, {
            useTemplateButtons: true, // False for legacy
            buttons: [
              {
                url: 'https://api.whatsapp.com/send?phone=5524998698812&text=%F0%9F%91%8B%20Ol%C3%A1%20agente%20da%204ALL%20TV%20estou%20precisando%20de%20um%20atendimento.',
                text: 'Ainda estou sem sinal'
              },
              {
                url: 'https://api.whatsapp.com/send?phone=5524998698812&text=%F0%9F%91%8B%20Ol%C3%A1%20agente%20da%204ALL%20TV%20estou%20precisando%20de%20um%20atendimento.',
                text: 'Falar com um(a) atendente'
              }
            ],
            title: 'Caso esteja com problemas no sinal, retire o equipamento da energia e aguarde 2 minutos. Isso pode ser o suficiente pra o sinal retornar', // Optional
            footer:`⚠️Philco modelo antigo (lançadas antes de 2020)\n⚠️Alguns modelos AOC antiga (Ruku tv e afins) (lançadas antes de 2020)\n⚠️Panasonic modelo antigo (lançadas antes de 2020)\n✅Televisões modelo Android funcionam tranquilamente.` // Optional
         })
      }else if(message.body == 'Teste agora mesmo!' && message.isGroupMsg == false){
        
        (async () => {
          const browser = await puppeteer.launch({headless:true});
          const page = await browser.newPage();
        
          await page.goto('https://painelcliente.com/');
          // Set screen size
          await page.setViewport({width: 1080, height: 1024});
          // Type into search box
          await page.waitForSelector('#username')
          await page.waitForSelector('#inputChoosePassword')
          await page.type('#username', 'joao4alltv');
          await page.type('#inputChoosePassword', 'jpkance1234');
          await page.waitForSelector('.btn-warning')
          await page.click('[class="btn btn-warning"]')
          await page.waitForSelector('.bx-user-check')
         let check = await page.$$('i[class="bx bx-user-check"]')
         check[0].click()
        let test =  await page.$$('i[class="bx bx-plus-circle"]')
        test[0].click()
        await page.waitForNavigation()
        await page.waitForSelector('#username')
        await page.waitForSelector('#password')
        const uname = await page.$eval("#username", (input) => {
          return input.getAttribute("value")
          });
          const pass = await page.$eval("#password", (input) => {
            return input.getAttribute("value")
            });
         await page.select('[name="bouquet[]"]', '16')
         await page.waitForSelector('button[class="btn btn-primary btn-sm"]')
         let buttonCreate = await page.$$('button[class="btn btn-primary btn-sm"]')
         buttonCreate[0].click()

        await client.sendText(message.chatId, 'Login e Senha de Acesso', {
          useTemplateButtons: true, // False for legacy
          buttons: [
            {
              id: 'credenciais teste',
              text: `Usuário: ${uname}\nSenha: ${pass}`
            },
            {
              url: 'https://drive.google.com/file/d/1LHRQVk_rE6t5xySkLMKTrlPbJstfU6fK/view?usp=sharing',
              text: 'Baixe o aplicativo'
            },
            {
              url: 'http://vouver.me',
              text: 'Acesse pelo Computador'
            }
          ],
          title:'4ALL TV',
          footer: '👇👇Aproveite o seu teste gratuito👇👇' // Optional
       });
          })()

      }else if (message.body ){
        
         
          client
          
          .sendText(message.chatId,'e')
        
      }else if(message.body == `/gpt ${message.body}`){
       async function gpt(){
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message.body}`,
            max_tokens:350
          });
          client
        .sendText(message.chatId, completion.data.choices[0].text)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
        
        }
        gpt()
       
      }else{
        console.log('nenhum dos casos anteriores')
      }
    })

   

  //   client.onAddedToGroup((chat)=>{
  // console.log(chat)
  // let cut = chat.lastReceivedKey.participant
  // let cuted = cut.substring(0,cut.length-5)
  //          client
  //         .sendText(chat.id, `👋 Bem vindo(a) +${cuted} ao grupo ${chat.name}! Leia as regras do grupo ♥ `)
  //         .then((result) => {
  //           console.log('Result: ', result); //return object success
  //         })
  //       .catch((erro) => {
  //         console.error('Error when sending: ', erro); //return object error
  //       });
      
  //   })
  }



 