// a function to load and display the data on the user dashboard.
const activeId = localStorage.getItem("activeID");
const id = Number(activeId);
import { supabase } from "../../../general/config.js";

export async function getUserData() {
    let result;
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (data && data.length !== 0) {
    result = data;
  } else {
    console.log("no data found for this user");
  }

  if (error) {
    console.log("this is an error", error);
  }
  return result;
}
