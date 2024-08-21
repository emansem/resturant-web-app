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
  const { data, error } = await supabase.from(`${tableName}`).select("*");

  if (error) {
    console.log("this is the error fetch the data", error);
  }
  if (data && data.length !== 0) {
    console.log("this is the fetch data", data);
    return data;
  } else {
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
  } else {
    return data;
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

// a function to increment total number of quantity in the cart and save it the database
export async function incrementCart(id) {
  const { data, error } = await supabase.rpc("increment_cart", {
    prod_qty: 1,
    prod_id: id
  });
  if (error) {
    console.log("this is the error updating the product", error);
  }
}

// a function to increment total number of orders and save it the database
export async function incrementNumberOfOrders(id) {
  const { data, error } = await supabase.rpc("increment_numberoforders", {
    ordernumber: 1,
    customerid: id
  });
  if (error) {
    console.log("this is the error increment the numbers of orders", error);
  }
}


export async function incrementNotificationLength(id) {
  const { data, error } = await supabase.rpc("totalnotifications", {
    total_value: 1, 
    clientid: id,
   
  });

  if (error) {
    console.log(
      "This is the error incrementing the notifications length",
      error
    );
  }
  if (data) {
    console.log("This is the increment data", data);
  }
}
//increment the number of times the coupon should be use
export async function incrementNumberoftimes(id) {
  const { data, error } = await supabase.rpc("numberoftime", {
    ordertimes: 1,
    customerid: id,
    
  });

  if (error) {
    console.log(
      "This is the error incrementing the notifications length",
      error
    );
  }
  
}
//decrement total carts item quantity
export async function decrementCart(id) {
  const { data, error } = await supabase.rpc("decrement_cart", {
    prod_qty: 1,
    prod_id: id
  });
  if (error) {
    console.log("this is the error updating the product", error);
  }
}






















