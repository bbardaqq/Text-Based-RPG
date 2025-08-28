/*
// Vurus ihtimali hesaplama
function calculateHitChance(acc,dodge,bonus) {
    // Basit bir ornek: %75 taban, saldirganin agi'si eklenir

    let num1 = acc;   // saldiranin acc'si
    let num2 = dodge;    // saldirilanin dodge'si
    let num3 = bonus;    //bonus. Bunun duzeltmek gerekebilir. Simdilik kalsin
    let num4 = ((num1 - num2) + num3); // Yuzdelik Hesaplama - Yuzde kac vurus sansi olacagini buluyor. 80 acc - 15 dodge + 5 bonus => %70 gibi.
    let minOran = 5; // %5
    let maxOran = 95; // %95
    let num5 = Math.max(minOran, Math.min(maxOran, num4)) / 100; // Orani sinirliyoruz. %5 ile %95 arasinda olacak. Kesin vurus veya kesin kacirma olmayacak.

    let rastgelesayi = Math.random(); // Rastgele sayi cekme - bunu yuzdelikle karsilastirarak vurus yapilip yapilmayacagini belirleyecegiz.
    
    if(rastgelesayi < num5){    // Fonksiyondan disari 1 cikarsa vurus basarili, 0 cikarsa basarisiz olacak!
        return 1;
    }

    else {
        return 0;
    }

}

// Hasar hesaplama
function calculateDamage(attack1,attack2, bonus ,baseskill) { // silahi gir, bonusu gir (saldirdigi skill falan olabilir), heronun base skillini gir. Fonksiyonlardan fonksiyona degisecek. Ornegin hero.str gibi.
    
    let num1 = attack1; //aralik1 
    let num2 = attack2; //aralik2 
    let num3 = bonus //ek hasar yuzdelik olarak girilecek (%50 ise direkt 50 yazilacak, 100 ise 100 yazilacak)
    let num4 = baseskill; //base skill puani tam haliyle girilecek (skill puani 10 ise 10 yazilacak, 15 ise 15 yazilacak)

    let lower = Math.min(num1, num2); // Araliklarin en kucugu
    let upper = Math.max(num1, num2); // Araliklarin en buyugu


    let num5 = Math.floor(Math.random() * ((upper - lower) + 1)) + lower; // Vurus araligindan rastgele sayi ceker. Ornegin 10-15 ise 10-15 arasindan bir sayi ceker.
    let num6 = 1+ (num3/100); // Yuzdelik hasar hesabi. Ornegin 50 ise 1.5 olarak hesaplar. 100 ise 2 olarak hesaplar.
    let num7 = 1+ ((num4 - 10)/10); // Base skill puanindan 10 eksilt ve yuzdelik olarak ekle. Ornegin 15 ise 50% ekstra hasar verir. Yani 1.5 olarak hesaplar. 10 ise 1 olarak hesaplar.
    let result = num5*num6*num7; // Hesaplama
    
    return result;
    
} 
*/

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
    Attack1: 8,
    Attack2: 12

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
      calculateDamage();
      PasliKilic.Durability --;
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