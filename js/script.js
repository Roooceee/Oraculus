// Permet de faire une requête
async function request() {
   try {

      // const req = await fetch(`../horoscope.json`);
      const req = await fetch(`https://raw.githubusercontent.com/Roooceee/Oraculus/refs/heads/main/horoscope.json`); // url du fichier JSON depuis mon repo github
      const response = req.status;
      console.log(response);
      
      if (response === 200) {
         const datas = await req.json();
         return datas;
      }
   } catch (e) {
      console.log(e);
      return null;
   }
}


function horoscopePrecedent(pIndex, allHoroscope){
   pIndex = pIndex === 0 ? allHoroscope.length-1 : pIndex-1 
   return pIndex
}

function horscopeSuivant(pIndex,allHoroscope){
   pIndex = pIndex === allHoroscope.length-1 ? 0 : pIndex+1
   return pIndex
}

// Fonction pour afficher l'horoscope
function showHoroscopeByIndex(pIndex, allHoroscope) {
   const precedentSigneDetail = document.querySelector('#precedent-horoscope');
   const suivantSigneDetail = document.querySelector('#suivant-horoscope');
   const nomSigne = document.querySelector('#nom_signe');
   const dateSigne = document.querySelector('#date_signe');
   const amourSigne = document.querySelector('#amour_signe');
   const travailSigne = document.querySelector('#travail_signe');
   const argentSigne = document.querySelector('#argent_signe');
   const santeSigne = document.querySelector('#sante_signe');
   const familleAmisSigne = document.querySelector('#famille_amis_signe');
   const conseilSigne = document.querySelector('#conseil_signe');
   const logoSigne = document.querySelector('#logo_signe');

   precedentSigneDetail.innerHTML = allHoroscope[horoscopePrecedent(pIndex,allHoroscope)].nom + '<span>' + allHoroscope[horoscopePrecedent(pIndex,allHoroscope)].dates + '</span>';
   suivantSigneDetail.innerHTML = allHoroscope[horscopeSuivant(pIndex,allHoroscope)].nom + '<span>' + allHoroscope[horscopeSuivant(pIndex,allHoroscope)].dates + '</span>';

   nomSigne.innerHTML = allHoroscope[pIndex].nom;
   dateSigne.innerHTML = "Du " + allHoroscope[pIndex].dates;
   amourSigne.innerHTML = "<span>Amour : </span>" + allHoroscope[pIndex].amour;
   travailSigne.innerHTML = "<span>Travail : </span>" + allHoroscope[pIndex].travail;
   argentSigne.innerHTML = "<span>Argent : </span>" + allHoroscope[pIndex].argent;
   santeSigne.innerHTML = "<span>Santé : </span>" + allHoroscope[pIndex].sante;
   familleAmisSigne.innerHTML = "<span>Famille et amis : </span>" + allHoroscope[pIndex].famille_et_amis;
   conseilSigne.innerHTML = "<span>Conseil : </span>" + allHoroscope[pIndex].conseil;
   logoSigne.src = allHoroscope[pIndex].imageURL;
   logoSigne.alt = allHoroscope[pIndex].nom;
}

async function main() {

   const allHoroscope = await request();
   
   const today = new Date();
   const h1 = document.querySelector('#datejour');
   const month = today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
   h1.textContent += " " + today.getDate() + "/" + month + "/" + today.getFullYear();

   let index = 0;

   if (!allHoroscope) {
      console.error('Failed to load horoscope data');
   }
   else {
      
   
      // Initial horoscope display
      showHoroscopeByIndex(index, allHoroscope);
   
      // Event listeners for horoscope navigation
      document.querySelector('#arrow-right').addEventListener('click', () => {
         index = horscopeSuivant(index,allHoroscope);
         showHoroscopeByIndex(index, allHoroscope);
      });
   
      document.querySelector('#arrow-left').addEventListener('click', () => {
         index = horoscopePrecedent(index,allHoroscope);
         showHoroscopeByIndex(index, allHoroscope);
      });
   
      document.querySelector('#suivant-horoscope').addEventListener('click', () => {
         index = horscopeSuivant(index,allHoroscope);
         showHoroscopeByIndex(index, allHoroscope);
      });
   
      document.querySelector('#precedent-horoscope').addEventListener('click', () => {
         index = horoscopePrecedent(index,allHoroscope);
         showHoroscopeByIndex(index, allHoroscope);
      });
   }

}

main();
