import separateComma from "./separateComma";

function getUserDetails(userDetails) {
  const { first_name, last_name, username, email, image } = userDetails;
  return {
    fullName: `${first_name} ${last_name}`,
    username: username,
    email: email,
    image: image
  }
}
  
export default getUserDetails;