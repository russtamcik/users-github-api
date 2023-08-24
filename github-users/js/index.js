const boxItem = document.querySelector('.box')
const input = document.querySelector('.input')

function boxCard(el) {
  return `
    <div class="card" style="width: 15rem;">
      <img src="${el.avatar_url}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${el.login}</h5>
        <a href="main.html?name=${el.login}" class="btn btn-primary">Go to github</a>
      </div>
    </div>
  `
}

async function getPosts() {
  try {
    let search = input.value
    let res
    if(search === ''){
      res = await fetch("https://api.github.com/users");
    }else{
      const searchValue = input.value
      res = await fetch(`https://api.github.com/search/users?q=${searchValue}`);
      console.log(res);
    }
    if (res.ok === false) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    let data = await res.json();
    console.log(data);

    boxItem.innerHTML = ''

    let posts = search === '' ? data : data.items;
    console.log(data.items);

    posts.map((element) => {
      boxItem.innerHTML += boxCard(element)
    })


  } catch (err) { 
    console.log("Error:", err);
  }
}

input.addEventListener('keyup', getPosts)

getPosts();