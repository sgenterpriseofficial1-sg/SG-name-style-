(() => {
  const $ = id => document.getElementById(id);
  let category="All";
  let allStyles=[];

  $("appLogo").src=LOGO_URL;
  $("appLogo").onerror=()=> {
    $("appLogo").style.display="none";
    $("appLogo").parentElement.textContent="SG";
    $("appLogo").parentElement.classList.add("logo-text");
  };

  const categories=["All","Popular","Favorites","Gamer","Elegant","Fancy","Symbols","Minimal","Invisible"];

  function toast(message){
    const el=$("toast"); el.textContent=message; el.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer=setTimeout(()=>el.classList.remove("show"),1900);
  }

  function escapeHTML(v){
    return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
  }

  function renderCategories(){
    $("categories").innerHTML=categories.map(c=>
      `<button class="cat ${c===category?"active":""}" data-cat="${c}">${c==="Favorites"?"♡ ":c==="Popular"?"🔥 ":""}${c}</button>`
    ).join("");
    document.querySelectorAll(".cat").forEach(b=>b.onclick=()=>{
      category=b.dataset.cat;
      renderCategories();
      render();
    });
  }

  function render(){
    const query=$("searchInput").value.trim().toLowerCase();
    let list=[...allStyles];

    if(category==="Favorites") list=list.filter(s=>Storage.isFavorite(s.id));
    else if(category==="Popular") list.sort((a,b)=>(Storage.likes(b.id)+Storage.copies(b.id))-(Storage.likes(a.id)+Storage.copies(a.id)));
    else if(category!=="All") list=list.filter(s=>s.category===category);

    if(query) list=list.filter(s=>s.name.toLowerCase().includes(query)||s.text.toLowerCase().includes(query));

    $("count").textContent=`${list.length} styles`;
    $("empty").classList.toggle("hidden",list.length>0);

    $("styles").innerHTML=list.map(s=>{
      const fav=Storage.isFavorite(s.id);
      return `<article class="card">
        <div class="card-top"><b>${escapeHTML(s.name)}</b><span>${escapeHTML(s.category)}</span></div>
        <div class="preview">${escapeHTML(s.text)}</div>
        <div class="actions">
          <button class="action" data-copy="${s.id}">📋 Copy <small>${Storage.copies(s.id)}</small></button>
          <button class="action ${fav?"fav":""}" data-fav="${s.id}">${fav?"♥":"♡"} <small>${Storage.likes(s.id)}</small></button>
        </div>
      </article>`;
    }).join("");

    document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=async()=>{
      const s=allStyles.find(x=>x.id===b.dataset.copy);
      try {
        await navigator.clipboard.writeText(s.text);
        Storage.copy(s.id); toast("Copied ✓"); render();
      } catch { toast("Copy failed"); }
    });
    document.querySelectorAll("[data-fav]").forEach(b=>b.onclick=()=>{
      const id=b.dataset.fav;
      const added=Storage.toggleFavorite(id);
      if(added)Storage.like(id);
      toast(added?"Added to favorites ♡":"Removed from favorites");
      render();
    });
  }

  $("generateBtn").onclick=render;
  $("nameInput").oninput=()=>{
    allStyles=StyleFactory.create($("nameInput").value.trim());
    render();
  };
  $("searchInput").oninput=render;

  $("themeBtn").onclick=()=>{
    document.body.classList.toggle("dark");
    $("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾";
    localStorage.setItem("sg_theme",document.body.classList.contains("dark")?"dark":"light");
  };

  if(localStorage.getItem("sg_theme")==="dark"){
    document.body.classList.add("dark");$("themeBtn").textContent="☀";
  }

  allStyles=StyleFactory.create($("nameInput").value.trim());
  renderCategories();
  render();

  if("serviceWorker" in navigator){
    window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
  }
})();
