const boxItem = document.querySelector('.box')
const boxMenu = document.querySelector('.box_item')
const comment = new URLSearchParams(location.search).get('name')
console.log(comment);


function boxCard(el, repository, follows, following) {
  return `
    <div class="card" style="width: 15rem;">
      <img src="${el.avatar_url}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${el.login}</h5>
        <div class="fol-item d-flex justify-content-evenly align-items-center text-center gap-3">
          <p class="fol-text">${follows.length} followers</p>
          <p class="fol-text">${following.length} following</p>
          <p class="fol-text">${repository.length} repository</p>
        </div>
      </div>
    </div>
  `
}

function funcRepository(res){
  return`
    <a class="" href="${res.html_url}">${res.name}</a>
  `
}
async function getPosts() {
  try {
    let res = await fetch(`https://api.github.com/search/users?q=${comment}`);
    let repository = await fetch(`https://api.github.com/users/${comment}/repos`);
    let followers = await fetch(`https://api.github.com/users/${comment}/followers`);
    let followings = await fetch(`https://api.github.com/users/${comment}/following`);

    if (res.ok === false) {
      console.log("Error", res.statusText);
    }

    if (repository.ok === false) {
      console.log("Error", repository.statusText);
    }

    if (followers.ok === false) {
      console.log("Error", followers.statusText);
    }

    if (followings.ok === false) {
      console.log("Error", followings.statusText);
    }

    let posts = await res.json();
    let repos = await repository.json();
    let follows = await followers.json(); 
    let following = await followings.json(); 

    repos.map((el) => {
      boxMenu.innerHTML += funcRepository(el)
    })

    let postsItem = posts.items;
    
    let loginItem = postsItem.filter((item) => item.login === comment)

    loginItem.map((item) => { 
      boxItem.innerHTML += boxCard(item, repos, follows, following,)
    });

  } catch (err) {
    console.log("Error:", err);
  }
}

getPosts()