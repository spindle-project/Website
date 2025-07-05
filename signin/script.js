import { getData, setData } from "/Global/firebase.js";

export async function syncData(userId, userName) {
  // The User is logging in!
  var userData = null;
  // Gets the data for the aformentioned usercode
  await getData("user_info.json", userId, (data) => {
    let userInfo = { id: userId, username: userName }; // infomation for the user
   if (data == null || undefined) {
      // The user is new
      setData("user_info.json", userId, JSON.stringify(userInfo));
           setData("user_set_list.json", userId, JSON.stringify([]));
    } else {
      // the user is an existing user
    }
          localStorage.setItem("USER_DATA", JSON.stringify(userInfo));
    getData("user_info.json", userId, (data) => {
      userData = data;
    });
    setTimeout(()=> {
    window.location.assign("/index.html");

    },500)
  });
}
