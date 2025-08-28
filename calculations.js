
/*
 Vurus ihtimali hesaplama
 export function calculateHitChance(acc,dodge,bonus) {
    // Basit bir ornek: %75 taban, saldirganin agi'si eklenir
    let base = 0.75;
    let bonus = (attacker.agility - defender.agility) * 0.02;
    let chance = base + bonus;

    return Math.min(Math.max(chance, 0.1), 0.95); // %10 - %95 arasi kisitla 

    const num1 = acc;   // saldiranin acc'si
    const num2 = dodge;    // saldirilanin dodge'si
    const num3 = bonus;    //bonus. Bunun duzeltmek gerekebilir. Simdilik kalsin
    const num4 = ((num1 - num2) + num3); // Yuzdelik Hesaplama - Yuzde kac vurus sansi olacagini buluyor. 80 acc - 15 dodge + 5 bonus => %70 gibi.
    const minOran = 5; // %5
    const maxOran = 95; // %95
    const num5 = Math.max(minOran, Math.min(maxOran, num4)) / 100; // Orani sinirliyoruz. %5 ile %95 arasinda olacak. Kesin vurus veya kesin kacirma olmayacak.

    const rastgelesayi = Math.random(); // Rastgele sayi cekme - bunu yuzdelikle karsilastirarak vurus yapilip yapilmayacagini belirleyecegiz.
    
    if(rastgelesayi < num5){    // Fonksiyondan disari 1 cikarsa vurus basarili, 0 cikarsa basarisiz olacak!
        return 1;
    }

    else {
        return 0;
    }

}

// Hasar hesaplama
 export function calculateDamage(attack1,attack2, bonus ,baseskill) { // silahi gir, bonusu gir (saldirdigi skill falan olabilir), heronun base skillini gir. Fonksiyonlardan fonksiyona degisecek. Ornegin hero.str gibi.
    
    const num1 = attack1; //aralik1 
    const num2 = attack2; //aralik2 
    const num3 = bonus //ek hasar yuzdelik olarak girilecek (%50 ise direkt 50 yazilacak, 100 ise 100 yazilacak)
    const num4 = baseskill; //base skill puani tam haliyle girilecek (skill puani 10 ise 10 yazilacak, 15 ise 15 yazilacak)

    const lower = Math.min(num1, num2); // Araliklarin en kucugu
    const upper = Math.max(num1, num2); // Araliklarin en buyugu


    const num5 = Math.floor(Math.random() * ((upper - lower) + 1)) + lower; // Vurus araligindan rastgele sayi ceker. Ornegin 10-15 ise 10-15 arasindan bir sayi ceker.
    const num6 = 1+ (num3/100); // Yuzdelik hasar hesabi. Ornegin 50 ise 1.5 olarak hesaplar. 100 ise 2 olarak hesaplar.
    const num7 = 1+ ((num4 - 10)/10); // Base skill puanindan 10 eksilt ve yuzdelik olarak ekle. Ornegin 15 ise 50% ekstra hasar verir. Yani 1.5 olarak hesaplar. 10 ise 1 olarak hesaplar.
    const result = num5*num6*num7; // Hesaplama
    
    return result;
    
}
*/