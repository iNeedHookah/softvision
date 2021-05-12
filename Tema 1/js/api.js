const URL = "https://randomuser.me/api/";

async function getUser() {
  let user = {
    name: "",
    profilePic: "",
    gender: "",
    email: "",
    age: 0,
  };

  await fetch(URL)
    .then(async (response) => {
      let result = await response.json();
      let data = result.results[0];

      user.name = data.name.first + " " + data.name.last;
      user.email = data.email;
      user.gender = data.gender.charAt(0).toUpperCase() + data.gender.slice(1);
      user.profilePic = data.picture.large;
      user.age = data.dob.age;
    })
    .catch((error) => {
      console.log(error);
      alert(
        "Hmm, looks like there is an error. It worked on my machine. Please try again!"
      );
      user = null;
    });

  return user;
}

async function createCard() {
  const user = await getUser();
  document
    .getElementById("user-thumbnail")
    .setAttribute("src", "./loading.gif");

  if (user != null) {
    document
      .getElementById("user-thumbnail")
      .setAttribute("src", user.profilePic);
    document.getElementById("name").innerText = user.name;
    document.getElementById("gender").innerText =
      user.gender + (user.gender === "Female" ? " 🚺" : " 🚹");
    document.getElementById("email").innerText = user.email;
    document.getElementById("age").innerText = user.age;
  }
}

document.getElementById("generate-user").addEventListener("click", createCard);
