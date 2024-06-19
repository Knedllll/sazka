let VylosovanaCisla = [];
let Vyhra = 0;
const vybraneCisla = [null, null, null, null, null, null];
var ready = false;

const vysledek = document.getElementById('vysledek');
var audioPipe = document.getElementById("audio-metal-pipe");
var audioWolf = document.getElementById("audio-wolf-howling");
var audioGoofy = document.getElementById("audio-goofy-ahh");
var audioSpongeBob = document.getElementById("audio-SpongeBob");
var audioHorse = document.getElementById("audio-horse");



function cleanDup(list){
    const newList = [];
    list.forEach(element => {
        if(element!= null && !newList.includes(element))newList.push(element);
    });
    return newList
}

function dup(arr){
    return arr.filter((item, index) => arr.indexOf(item) !== index);
}

function ZkontrolujVstupu(id) {    
    document.body.classList.remove('mlg');
    for(let i = 1;i<16;i++){
        let ales = document.getElementById('ales' + i);
        ales.style.opacity=0;
    }
    vysledek.innerHTML="";
    let ok = 0;
    vybraneCisla[parseInt(id.slice(-1))] = parseInt(document.getElementById(id).value);
    const duplicates = cleanDup(dup(vybraneCisla));
    for(let i =1;i<=6;i++){
        let kruh = document.getElementById("cislo" + i);
        if (1 > parseInt(kruh.value) || parseInt(kruh.value) > 49){
            kruh.style.backgroundColor = "gray";
        }
        else if(duplicates.includes(parseInt(kruh.value))){
            kruh.style.backgroundColor = "orange";
        }else{
            kruh.style.backgroundColor = "yellow";
            if (kruh.value != '') ok+=1;
        }
    }
    ok==6 ? ready = true: ready = false;
}

function VylosujCislo() {
    VylosovanaCisla = [];
    while(VylosovanaCisla.length != 6){
        let num = Math.floor(Math.random() * 49) + 1;
        if (!VylosovanaCisla.includes(num)) 
            VylosovanaCisla.push(num);
    }
    document.getElementById('VylosovaneCislo').innerHTML = "";
    VylosovanaCisla.forEach((num)=>{
        if (vybraneCisla.includes(parseInt(num)))
            document.getElementById('VylosovaneCislo').innerHTML += '<b style="color: green;">'+ num + '</b>' + " ";
        else
        document.getElementById('VylosovaneCislo').innerHTML += '<b style="color: red;">'+ num + '</b>' + " ";
    })
}

function Zkontroluj() {
    switch (Object.values(dup(vybraneCisla.concat(VylosovanaCisla))).length) {
        case 0:
            vysledek.innerHTML = "Bohužel jsi nic nevyhrál... Ale nezoufej! Většina hráčů přestane hrát těsně předtím než vyhraje jackpot!!!";
            audioSpongeBob.play();
            break;
        case 1:            
            vysledek.innerHTML = "Jeden správně, to neni dobré, zlepši to na příště. Prozatím tady máš lízátko.";            
            audioPipe.play();
            break;
        case 2:
            vysledek.innerHTML = "Trefil jsi dvě správně, jako arab...";
            audioGoofy.play();
            break;
        case 3:
            vysledek.innerHTML = "Tři správně! Vypadá to, že tvé štěstí začíná. Nezastavuj! Riskování je lepší než litovaní.<br><img src='src/raf360x360075tfafafaca443f4786.png'>";
            audioWolf.play();
            break;
        case 4:
            vysledek.innerHTML = "Vyhrál jsi 4 koně. můžeš stratit pouze 100% ale vyhrát VŠECHNO, proto jeď dál.";
            audioHorse.play();
            break;
        case 5:
            vysledek.innerHTML = 'Vyhrál jsi pozvánku na tanec<br>.<video height="500px" autoplay controls><source src="src/tanec.mp4" type="video/mp4"></video>';     
            break;
        case 6:
            vysledek.innerHTML = '<video height="500px" autoplay controls><source src="src/video2.mp4" type="video/mp4"></video>';            
            document.body.classList.add('mlg');
            for(let i = 1;i<16;i++){
                let ales = document.getElementById('ales' + i);
                ales.style.opacity=1;
                ales.style.position='absolute';
                let x = Math.random()*80;
                let y = Math.random()*80;
                console.log("x: " + x + "\ny: " + y);
                ales.style.left=x + "vw";
                ales.style.top=y + "vh";
            }
            break;
        default:
            console.log('Chyba: podminka nezachicena');
            console.log((dup(vybraneCisla.concat(VylosovanaCisla))));

            for(let i=1;i<=6;i++){
                let inp = document.getElementById("cislo" + i);
                if (VylosovanaCisla.includes(parseInt(inp.value))) inp.style.color='green';
            }            
    }
}