const Storage = (() => {
  const KEY = "sg_name_style_data_v1";
  const defaults = {favorites:[], copies:{}, likes:{}};

  function read() {
    try { return {...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}; }
    catch { return {...defaults}; }
  }
  function write(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

  return {
    getFavorites(){return read().favorites},
    isFavorite(id){return read().favorites.includes(id)},
    toggleFavorite(id){
      const d=read(), i=d.favorites.indexOf(id);
      if(i>=0)d.favorites.splice(i,1); else d.favorites.push(id);
      write(d); return i<0;
    },
    copy(id){const d=read();d.copies[id]=(d.copies[id]||0)+1;write(d)},
    like(id){const d=read();d.likes[id]=(d.likes[id]||0)+1;write(d)},
    copies(id){return read().copies[id]||0},
    likes(id){return read().likes[id]||0},
    clear(){localStorage.removeItem(KEY)}
  };
})();
