async function getUsers(id) {
  try {
    let response = await fetch(
      "https://jsonplaceholder.typicode.com/users/" + id
    );
    let user = await response.json();
  } catch (err) {
    alert(err);
  }
}

console.log(getUsers(1));
