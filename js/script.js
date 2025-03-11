// Permet de faire une requete
async function request(){
   
   try {
      const req = await fetch(`../horoscope.json`)
      const response = req.status
      console.log(response)
      
      if(response == 200){
         const datas = await req.json()
         return datas
      }
      
   }
   catch(e){
      console.log(e)
      return null
   }
}


async function main(){

   let allHoroscope = await request()

   const today = new Date()
   
   const h1 = document.querySelector('#datejour');
   const month =today.getMonth()<9 ? "0"+(today.getMonth()+1) : today.getMonth()+1
   h1.textContent +=" "+today.getDate()+"/"+month+"/"+today.getFullYear()
   
   const suivant = document.querySelector('#arrow-right')
   const precedent = document.querySelector('#arrow-left')
   
   let index = 0
   
   const precedentSigneDetail = document.querySelector('#left-horoscope')

   const suivantSigneDetail = document.querySelector('#right-horoscope')

   const nomSigne = document.querySelector('#nom_signe')
   const dateSigne = document.querySelector('#date_signe')
   const amourSigne = document.querySelector('#amour_signe')
   const travailSigne = document.querySelector('#travail_signe')
   const argentSigne = document.querySelector('#argent_signe')
   const santeSigne = document.querySelector('#sante_signe')
   const familleAmisSigne = document.querySelector('#famille_amis_signe')
   const conseilSigne = document.querySelector('#conseil_signe')
   const logoSigne = document.querySelector('#logo_signe')
   

   function showPrecedentHoroscope(pIndex){
      pIndex = pIndex === 0 ? allHoroscope.length-1 : pIndex-1 
      precedentSigneDetail.innerHTML=allHoroscope[pIndex].nom+'<span>'+allHoroscope[pIndex].dates+'</span>'
   }

   function showSuivantHoroscope(pIndex){
      pIndexNext = pIndex === allHoroscope.length-1 ? 0 : pIndex+1
      suivantSigneDetail.innerHTML=allHoroscope[pIndex].nom+'<span>'+allHoroscope[pIndex].dates+'</span>'
   }  
   
   
   function showHoroscopeByIndex(pIndex){

      showPrecedentHoroscope(pIndex)
      showSuivantHoroscope(pIndex)

      nomSigne.innerHTML = allHoroscope[pIndex].nom
      dateSigne.innerHTML = "Du "+allHoroscope[pIndex].dates
      amourSigne.innerHTML = "<span>Amour : </span>"+allHoroscope[pIndex].amour
      travailSigne.innerHTML = "<span>Travail : </span>"+allHoroscope[pIndex].travail
      argentSigne.innerHTML = "<span>Argent : </span>"+allHoroscope[pIndex].argent
      santeSigne.innerHTML = "<span>Santé : </span>"+allHoroscope[pIndex].sante
      familleAmisSigne.innerHTML = "<span>Famille et amis : </span>"+allHoroscope[pIndex].famille_et_amis
      conseilSigne.innerHTML = "<span>Conseil : </span>"+allHoroscope[pIndex].conseil
      logoSigne.src =allHoroscope[pIndex].imageURL
      logoSigne.alt = allHoroscope[pIndex].nom
   }
   
   showHoroscopeByIndex(index)
   
   suivant.addEventListener('click',(e)=>{
      if(index==allHoroscope.length-1){
         index = 0
      }
      else{
         index += 1
      }
      showHoroscopeByIndex(index)
   })
   
   precedent.addEventListener('click',(e)=>{
      if(index==0){
         index=allHoroscope.length-1
      }
      else {
         index -= 1
      }
      showHoroscopeByIndex(index)
   })


   suivantSigneDetail.addEventListener('click',(e)=>{
      if(index==allHoroscope.length-1){
         index = 0
      }
      else{
         index ++
      }  
      showHoroscopeByIndex(index)
   })

   precedentSigneDetail.addEventListener('click',(e)=>{
      if(index==0){
         index=allHoroscope.length-1
      }
      else {
         index --
      }
      showHoroscopeByIndex(index)
   })

}

main()