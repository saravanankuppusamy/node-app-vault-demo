require('dotenv').config();
const vault = require('node-vault')({
  apiVersion: 'v1', 
  endpoint: process.env.VAULT_ADDR, 
  token: process.env.VAULT_TOKEN
});
const SECRET_PATH = 'secret/data/users'; // Path to store user secrets
// Save email and password
async function saveCredentials(email, password) {
  try {
    const result = await vault.write(SECRET_PATH, {
      data: {
        [email]: { password }
      }
    });
    console.log(`Credentials saved for ${email}:`, result);
  } catch (error) {
    console.error('Error saving credentials:', error);
  }
}
// Update credentials by email
async function updateCredentials(email, newPassword) {
  try {
    const result = await vault.write(SECRET_PATH, {
      data: {
        [email]: { password: newPassword }
      }
    });
    console.log(`Credentials updated for ${email}:`, result);
  } catch (error) {
    console.error('Error updating credentials:', error);
  }
}
// Get credentials by email
async function getCredentials(email) {
  try {
    const result = await vault.read(SECRET_PATH);
    const userData = result.data.data[email];
    if (userData) {
      console.log(`Retrieved credentials for ${email}:`, userData);
    } else {
      console.log(`No credentials found for ${email}`);
    }
  } catch (error) {
    console.error('Error retrieving credentials:', error);
  }
}
// Delete credentials by email
async function deleteCredentials(email) {
  try {
    const result = await vault.delete(SECRET_PATH);
    console.log(`Credentials deleted for ${email}`);
  } catch (error) {
    console.error('Error deleting credentials:', error);
  }
}
// Example Usage
(async () => {
  await saveCredentials('saravanan@sara.com', 'loveforever');
  await getCredentials('saravanan@sara.com');
  //await updateCredentials('saravanan@sara.com', 'nolovenever');
  //await getCredentials('saravanan@sara.com');
  //await deleteCredentials('saravanan@sara.com');
})();
