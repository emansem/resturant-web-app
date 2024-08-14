import { supabase } from "../general/config.js";

// a function to insert into  the table

export async function saveDateIntoDataBase(saveData, tableName) {
  const { data, error } = await supabase
    .from(`${tableName}`)
    .insert([saveData])
    .select();
  if (data && data.length !== 0) {
    console.log("this is the inserted data", data);
    return data;
  }
  if (error) {
    console.error("this is the error inserting the data", error);
  }
}

// a funtion to update the data  in the database

export async function updateDataIntoDataBase(
  saveData,
  tableName,
  id,
  actionId
) {
  const { data, error } = await supabase
    .from(`${tableName}`)
    .update(saveData)
    .eq(`${id}`, actionId)
    .select();
  if (data && data.length !== 0) {
    console.log("this is the updated data", data);
    return data;
  }
  if (error) {
    console.log("this is the error updating the data", error);
  }
}

// this is the function to delete data in the database.
export async function deletDataInDataBase(tableName, id, actionId) {
  const { data, error } = await supabase
    .from(`${tableName}`)
    .delete()
    .eq(`${id}`, actionId)
    .select();
  if (data && data.length !== 0) {
    console.log("this is the deleted data", data);
    return data;
  }
  if (error) {
    console.log("this is the error deleting the data", error);
  }
}

//function to fetch the date from database
export async function fetchAllDataFromDataBase(tableName) {
  const { data, error } = await supabase
    .from(`${tableName}`)
    .select("*")
   
    if (error) {
      console.log("this is the error fetch the data", error);
    }
  if (data && data.length !== 0) {
    console.log("this is the fetch data", data);
    return data;
  }else{
    return data;
  }
 
}

// this is the function to fetch  a specific data in the database.
export async function fetchDataFromDataBase(tableName, id, actionId) {
  const { data, error } = await supabase
  .from(`${tableName}`)
  .select("*")
  .eq(`${id}`, actionId);
  if (error) {
    console.log("this is the error fetch the data", error);
  }
if (data && data.length !== 0) {
  console.log("this is the fetch data", data);
  return data;
}else{
  return data
}

}

//a function to format currency.
export function formatAmout(amount) {
  const formatData = new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF"
  }).format(amount);
  return formatData;
}

// a function increment data in the detabase

export async function incrementCart(amount, id){
  const {data, error} = await supabase.rpc('increment_cart', {
    prod_price : amount,
    prod_qty : 1,
    prod_id : id
  })
  if(error){
    console.log('this is the error updating the product', error);
  }
  
}

//decrement the product 
export async function decrementCart(amount, id){
  const {data, error} = await supabase.rpc('decrement_cart', {
    prod_price : amount,
    prod_qty : 1,
    prod_id : id
  }).select();
  if(error){
    console.log('this is the error updating the product', error);
  }
  
}

















