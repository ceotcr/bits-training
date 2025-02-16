import { showSnackbar } from "./cart.js";
import { user } from "./user.js";
const subBt = document.getElementById('form-submit') as HTMLButtonElement;
subBt.addEventListener('click', async () => {
    const username = (document.getElementById('username') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();
    if (!username || !password) {
        showSnackbar("Please enter username & password!", "warning")
        return;
    }
    await user.login(username, password)
});