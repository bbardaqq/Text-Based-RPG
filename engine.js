
import { calculateHitChance, calculateDamage } from './calculations.js';

// Oyuncu ve dusman state
let player = {
  name: "Hero",
  hp: 20,
  attack: 15,
  acc: 80,
  dodge: 5,
  inventory: [],
  weapon: null
};

let enemies = [
  { name: "goblin", hp: 10, attack: 3, acc: 70, dodge: 20, weapon: weapons[0] },
  { name: "orc", hp: 15, attack: 4, acc: 90, dodge: 5, weapon: weapons[1] },
  { name: "troll", hp: 25, attack: 6, acc: 60, dodge: 10, weapon: weapons[3] },
  { name: "bandit", hp: 12, attack: 5, acc: 80, dodge: 15, weapon: weapons[2] }
];

const weapons = [
  { name: "PasliKilic", durability: 10, attack1: 2, attack2: 6 },
  { name: "UzunKilc", durability: 15, attack1: 4, attack2: 8 },
  { name: "BuyuluHancer", durability: 12, attack1: 1, attack2: 10 },
  { name: "Baltaci", durability: 8, attack1: 6, attack2: 12 }
];


// Log alanina yazdirma fonksiyonu
function log(message) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += message + "<br>";
  logDiv.scrollTop = logDiv.scrollHeight; // her zaman en asagi kay
}

function showInventory() {
  if (player.inventory.length === 0) {
    log(" Envanterin bos.");
    return;
  }
  log(" Envanterin:");
  player.inventory.forEach(w => {
    log(`- ${w.name} (Durability: ${w.durability})`);
  });
}
function equipWeapon(weaponName) {
  const found = player.inventory.find(w => w.name.toLowerCase() === weaponName.toLowerCase());
  if (!found) {
    log(` ${weaponName} sende yok!`);
    return;
  }
  player.weapon = found;
  log(` ${weaponName} kusandin!`);
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
      
      let hasar = calculateDamage(player.weapon.attack1, player.weapon.attack2, 0, player.attack);
      player.weapon.Durability --;
      target.hp -= hasar;
      log(`${hasar.toFixed(0)} hasar verdin! (HP: ${target.hp})`);
      log(`${player.weapon.name} yipraniyor! Dayaniklilik: ${player.weapon.durability}`);
      if(player.weapon.durability <=0){
        log(`${player.weapon.name} kirildi!`);
        player.inventory = player.inventory.filter(w=> w !== player.weapon);
        player.weapon = null;
      }
    } else if (calculateHitChance(player,target) == 0){
      log("Iskaladin!");
      
    }
    if (target.hp > 0) {
      player.hp -= target.attack;
      log(` ${target.name} sana ${target.attack} hasar verdi! (Senin HP: ${player.hp})`);
    } else {
      log(` ${target.name} oldu!`);
      if(target.weapon){
        player.inventory.push({...target.weapon}); // kopya ekliyoruz
        log(`🎁 ${target.name}, ${target.weapon.name} silahını düşürdü! Envanterine eklendi.`);
      }
      enemies = enemies.filter(e => e.hp >0);
    }

    if (player.hp <= 0) {
      log(" Sen oldun! Oyun bitti.");
    }
  } 
  //status komutu
  else if (cmd === "status") {  //status ile hp'lere bakiyor. Saldiri gibi seylerimize de bakmak lazim buradan.
    log(` ${player.name} HP: ${player.hp}`);
    enemies.forEach(e => log(`- ${e.name} HP: ${e.hp}`));
  } 
  else if (cmd == "equip") {    //equip ile silah elde edilecek
    equipWeapon(parts[1]);
  }
  else if (cmd == "inventory"){ // envantere bakilacak
    showInventory();
    }
  else {
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