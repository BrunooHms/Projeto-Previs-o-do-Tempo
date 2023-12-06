apiKey = '390c25e8d9d76bde25962efca8363955';
btnPesquisa = document.querySelector('#botaoPesquisa');
nomeCidade = document.querySelector('#inputCidade');
spanCidade = document.querySelector('#cidade');
spanTemp = document.querySelector('#temperatura span');
descricao = document.querySelector('#descricaoClima');
fundoTela = document.querySelector('#fundoTela');
imgPrevisao = document.querySelector('#iconePrevisao');
descUmidade = document.querySelector('#umidade');


// Funções 

//Função aonde retorna os dados da API , tranforma em JSON e coloca em uma variável.
const dadosAPI = async (cidade) =>{
  const chaveApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`
  const res = await fetch(chaveApiUrl);
  const data = await res.json();

  return data
 
}

//Função que muda a imagem de fundo de acordo com o a situação do clima
function mudarImgFundo(clima){
  if (descCidade === "nublado"){
    fundoTela.className = '';
    fundoTela.classList.add('fundo-nublado');
   
 } else  if (descCidade === "algumas nuvens"){
  fundoTela.className = '';
  fundoTela.classList.add('fundo-nuvens')
 
 } else if (descCidade === "chuviscos com intensidade de raios"){
    fundoTela.className = '';
    fundoTela.classList.add('fundo-chuviscos-raios')

 } else if (descCidade === "chuva leve"){
    fundoTela.className = '';
    fundoTela.classList.add('fundo-chuva-leve')

 } else if (descCidade === "névoa"){
    fundoTela.className = '';
    fundoTela.classList.add('fundo-nevoa')

 } else if (descCidade === "céu limpo"){
    fundoTela.className = '';
    fundoTela.classList.add('fundo-ceu-limpo')
    
 } else if (descCidade === "nuvens dispersas"){
    fundoTela.className = '';
    fundoTela.classList.add('fundo-nuvens-dispersas')

 } else if (descCidade === "pouca neve"){
    fundoTela.className = '';
    fundoTela.classList.add('fundo-pouca-neve')
 } else if (descCidade === "trovoadas"){
   fundoTela.className = '';
   fundoTela.classList.add('fundo-trovoadas')
 }
 

}

//Função para tratar os dados recebidos da API e exibi-los
const mostrarDadosApi = async (cidade) => {
  const data = await dadosAPI(cidade);
    
   //Capturando apenas os dados necessários
   nomeCidade = data.name
   tempCidade = data.main.temp
   descCidade = data.weather[0].description
   descCidadeM = descCidade[0].toUpperCase() + descCidade.substr(1);
   iconePrevisao = data.weather[0].icon;
   umidade = data.main.humidity;

   //Exibindo na tela os dados tratados capturados.
   spanCidade.innerHTML = `<p><i class="fa fa-map-marker" id= "marcador"></i> ${nomeCidade}<p>`
   spanTemp.innerHTML = `${tempCidade}&deg;C`
   descricao.innerHTML = descCidadeM
   imgPrevisao.src = `https://openweathermap.org/img/wn/${iconePrevisao}.png`
   descUmidade.innerHTML = `Umidade: ${umidade}%`

   //Chamando a função de trocar a tela e passando o parâmetro que indica a situação do clima.
    mudarImgFundo(descCidade);
}


//Eventos

//Evento que captura o click no botão de pesquisa e executa o código
btnPesquisa.addEventListener('click', function() {
      const cidade = inputCidade.value;
      if(cidade === '') return;
      mostrarDadosApi(cidade);
      document.querySelector('#inputCidade').value = "";
   })


//Evento que dispara ao ENTER ser pressionado
inputCidade.addEventListener('keypress', function(e){
   if(e.key === 'Enter') {
      const cidade = inputCidade.value;
      if(cidade === '') return;
      mostrarDadosApi(cidade)
      document.querySelector('#inputCidade').value = "";
   }
})











