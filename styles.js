const StyleFactory = (() => {
  const map = (text, upper, lower) => [...text].map(ch => {
    const n = ch.charCodeAt(0);
    if (n >= 65 && n <= 90) return String.fromCodePoint(upper + n - 65);
    if (n >= 97 && n <= 122) return String.fromCodePoint(lower + n - 97);
    return ch;
  }).join("");

  const bold = t => map(t, 0x1D400, 0x1D41A);
  const italic = t => map(t, 0x1D434, 0x1D44E);
  const boldItalic = t => map(t, 0x1D468, 0x1D482);
  const mono = t => map(t, 0x1D670, 0x1D68A);
  const double = t => map(t, 0x1D538, 0x1D552);
  const gothic = t => map(t, 0x1D504, 0x1D51E);

  const fullWidth = t => [...t].map(c => {
    const n = c.charCodeAt(0);
    return n >= 33 && n <= 126 ? String.fromCharCode(n + 0xFEE0) : c;
  }).join("");

  const circled = t => [...t].map(c => {
    const n = c.toUpperCase().charCodeAt(0);
    return n >= 65 && n <= 90 ? String.fromCodePoint(0x24B6 + n - 65) : c;
  }).join("");

  const small = t => {
    const m={a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ғ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",o:"ᴏ",p:"ᴘ",q:"ǫ",r:"ʀ",s:"s",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ"};
    return [...t].map(c=>m[c.toLowerCase()]||c).join("");
  };

  function create(name) {
    const n = name || "Your Name";
    const a = [
      ["Bold","Elegant",bold(n)],["Italic","Elegant",italic(n)],["Bold Italic","Elegant",boldItalic(n)],
      ["Monospace","Minimal",mono(n)],["Small Caps","Elegant",small(n)],["Full Width","Minimal",fullWidth(n)],
      ["Circled","Symbols",circled(n)],["Double Struck","Elegant",double(n)],["Gothic","Fancy",gothic(n)],
      ["Gamer 亗","Gamer",`亗 ${n} 亗`],["Gamer 乂","Gamer",`乂 ${n} 乂`],["Gamer メ","Gamer",`メ ${n} メ`],
      ["Gamer 么","Gamer",`么 ${n} 么`],["Warrior","Gamer",`⚔ ${n} ⚔`],["Fire","Gamer",`🔥 ${n} 🔥`],
      ["Skull","Gamer",`☠ ${n} ☠`],["Crown","Fancy",`♛ ${n} ♛`],["King","Fancy",`♚ ${n} ♚`],
      ["Star","Symbols",`★ ${n} ★`],["Stars","Symbols",`✦ ${n} ✦`],["Diamond","Symbols",`◆ ${n} ◆`],
      ["Heart","Symbols",`♡ ${n} ♡`],["Moon","Symbols",`☾ ${n} ☽`],["Flower","Symbols",`❀ ${n} ❀`],
      ["Minimal Dot","Minimal",`• ${n} •`],["Minimal Line","Minimal",`— ${n} —`],
      ["Minimal Slash","Minimal",`/ ${n} /`],["Minimal SG","Minimal",`SG | ${n}`],
      ["Invisible Space","Invisible","ㅤ"],["Invisible Character","Invisible","⠀"],
      ["Invisible Name","Invisible",`ㅤ${n}ㅤ`],
      ["Fancy Crown","Fancy",`꧁♛ ${n} ♛꧂`],["Fancy Wings","Fancy",`꧁༺ ${n} ༻꧂`],
      ["Fancy Box","Fancy",`『 ${n} 』`],["Fancy Flower","Fancy",`꧁❀ ${n} ❀꧂`],
      ["Fancy Diamond","Fancy",`◈ ${n} ◈`],["Fancy Stars","Fancy",`✦ ${n} ✦`],
      ["Angel","Fancy",`༺ ${n} ༻`],["Royal","Fancy",`『♛ ${n} ♛』`],
      ["Dragon","Gamer",`『🐉 ${n} 🐉』`],["Ninja","Gamer",`乂🥷 ${n} 🥷乂`],
      ["Power","Gamer",`⚡ ${n} ⚡`],["Champion","Gamer",`🏆 ${n} 🏆`],
      ["Music","Symbols",`♪ ${n} ♫`],["Love","Symbols",`♥ ${n} ♥`]
    ];
    return a.map((x,i)=>({id:"style_"+i,name:x[0],category:x[1],text:x[2]}));
  }
  return {create};
})();
