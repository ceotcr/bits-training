import { showSnackbar } from "./cart.js";
import { user } from "./user.js";
const subBt = document.getElementById('form-submit');
subBt.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!username || !password) {
        showSnackbar("Please enter username & password!", "warning");
        return;
    }
    await user.login(username, password);
});
