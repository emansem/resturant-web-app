import { saveDateIntoDataBase,fetchAllDataFromDataBase } from "../../../../general/data.js";


const quarters = [
    "Ahala",
    "Awae",
    "Bastos",
    "Biyem-Assi",
    "Briqueterie",
    "Bonamoussadi",
    "Carrefour Obili",
    "Carrefour Warda",
    "Cité Verte",
    "Carrière",
    "Damas",
    "Djoungolo",
    "Ekounou",
    "Elig-Edzoa",
    "Elig-Essono",
    "Emana",
    "Etoudi",
    "Essos",
    "Etoa-Meki",
    "Fouda",
    "Mfandena",
    "Golf",
    "Gare Mvan",
    "Gyneco",
    "Gendarmerie Nationale",
    "Hippodrome",
    "Hôpital Central",
    "Jouvence",
    "Mballa II",
    "Mendong",
    "Melen",
    "Mimboman",
    "Mvog-Mbi",
    "Mvog-Ada",
    "Mvog-Ada Tsimi",
    "Mvog-Betsi",
    "Mvan",
    "Nkolbisson",
    "Nkol-Eton",
    "Nkoabang",
    "Nkolndongo",
    "Nsam",
    "Nkomo",
    "Obili",
    "Odza",
    "Olembé",
    "Santa Barbara",
    "Simbock",
    "Soa",
    "Tsinga",
    
  ]
async function saveAllQuarters(){
    const data = await fetchAllDataFromDataBase('quarters');
const existingQuarters = new Set(data.map(item=>item.name));
 for(let quarter of quarters){
    if(!existingQuarters.has(quarter)){
        const saveData = {
            name : quarter,
        }
        await saveDateIntoDataBase (saveData, 'quarters');
    }
 }
     
}
saveAllQuarters();