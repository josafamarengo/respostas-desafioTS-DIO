// Não terminado ==============================================

var API_KEY: any = '3f301be7381a03ad8d352314dcc3ec1d';
let requestToken: any;
let username: any;
let password: any;
let sessionId: any;
let LIST_ID = '7101979';

let loginButton: any = document.getElementById('login-button')!;
let searchButton = document.getElementById('search-button')!;
let searchContainer = document.getElementById('search-container')!;

loginButton.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
})

searchButton.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  let query = document.getElementById('search')!;
  let listaDeFilmes: any = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }
  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
})

function preencherSenha() {
  password = document.getElementById('senha')!;
  validateLoginButton();
}

function preencherLogin() {
  username =  document.getElementById('login')!;
  validateLoginButton();
}

function preencherApi() {
  API_KEY = document.getElementById('api-key')!;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && API_KEY) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {

  static async get({url, method, body = null}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query: any) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
    method: "GET"
  })
  return result
}

async function adicionarFilme(filmeId: any) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${API_KEY}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken () {
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`,
    method: "GET"
  })
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
    method: "POST",
    body:  {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${API_KEY}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: Number, listaId: Number) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${API_KEY}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${LIST_ID}?api_key=${API_KEY}`,
    method: "GET"
  })
  console.log(result);
}