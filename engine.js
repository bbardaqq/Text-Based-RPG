
import { calculateHitChance, calculateDamage } from './calculations.js';
// Oyuncu ve dusman state
let player = {
  name: "Hero",
  hp: 20,
  attack: 5,
  acc: 80,
  dodge: 5
};

let enemies = [
  { name: "goblin", hp: 10, attack: 3, acc:70, dodge: 20 },
  { name: "orc", hp: 15, attack: 4, acc: 90, dodge: 5 }
];

let PasliKilic = {
    Durability: 10,
    Attack1: 2,
    Attack2: 6

};


// Log alanina yazdirma fonksiyonu
function log(message) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += message + "<br>";
  logDiv.scrollTop = logDiv.scrollHeight; // her zaman en asagi kay
}

// Komut isleyici
function handleCommand(input) {
  const parts = input.trim().toLowerCase().split(" ");
  const cmd = parts[0]; // ilk kelimeyi cmd'ye atiyor.

  // attack komutu
  if (cmd === "attack") {       // ilk kelime attack diye mi bakiyor. Farkli bir if durumuyla buradan farkli eylemler yaptiracagim.
    const targetName = parts[1];  //target name'yi yazilan ikinci kelimeden bakiyor. Attack goblin'de goblin = target yani.
    const target = enemies.find(e => e.name === targetName && e.hp > 0);

    if (!target) {
      log(`Boyle bir dusman yok veya zaten olu.`);
      return;
    }

    // oyuncu saldirisi
    if (calculateHitChance(player.acc,target.dodge,0) == 1) { // burasi duzeltilecek. Buraya calculations.js'den saldiri ve vurus ihtimali cekecegiz. If ile vurup vuramadigini kontrol edip ardindan hasari hesaplattiracagiz.
      let hasar = calculateDamage();
      PasliKilic.Durability --;
      target.hp -= hasar;
      log(` ${target.name} adli canavara ${hasar} hasar verdin! (HP: ${target.hp})`);
      log(`Pasli kilic koreliyor! ${PasliKilic.Durability}/10`)
    } else if (calculateHitChance(player,target) == 0){
      log("Iskaladin!");
      
    }
       


    //log(`${player.name} ${target.name}'e ${player.attack} hasar verdi. (HP: ${target.hp})`);

    // dusman olmediyse karsi saldiri
    if (target.hp > 0) {
      player.hp -= target.attack;
      log(` ${target.name} sana ${target.attack} hasar verdi! (Senin HP: ${player.hp})`);
    } else {
      log(` ${target.name} oldu!`);
    }

    if (player.hp <= 0) {
      log(" Sen oldun! Oyun bitti.");
    }
  } 
  
  //status komutu
  else if (cmd === "status") {  //status ile hp'lere bakiyor. Saldiri gibi seylerimize de bakmak lazim buradan.
    log(` ${player.name} HP: ${player.hp}`);
    enemies.forEach(e => log(`- ${e.name} HP: ${e.hp}`));
  } else {
    log(" Bilinmeyen komut.");
  }
}

// Input alani
document.getElementById("command").addEventListener("keydown", function (e) {   //html'den command id'li metni aliyor. Input kismina ne yazarsak gelcek.
  if (e.key === "Enter") {
    const input = this.value;
    this.value = "";
    handleCommand(input);
  }
});

// Acilis Mesaji
log(" Text Based DND Oyununa Hoseldin!");
log("Komutlar: attack <dusman>, status");