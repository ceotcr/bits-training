document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
  });
  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;

    if (text.trim() == "") return;
    createTodo(text);

    inputTodo.value = "";
    saveAllTodo();
  });

  const createTodo = async (task, todoid = -1) => {
    if (todoid === -1) {
      const { status, id } = await addViaAPI(task)
      if (!status) return;
      todoid = id
    }
    const li = document.createElement("li");
    li.dataset.id = todoid
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `<input readonly  class="form-control text-todo border-0 bg-transparent" value="${task}"/>
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-warning">Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
    </div>`;
    ulTodo.appendChild(li);
    const input = li.querySelector(".text-todo");
    input.addEventListener("keyup", async (e) => {
      if (e.key === "Enter") {
        input.setAttribute("readonly", true);
        await editViaAPI(input.value, todoid);
        saveAllTodo();
        document.querySelector(".save-hint").classList.toggle("invisible")
      }
    });
  };

  ulTodo.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const task = e.target.closest(".list-group-item").querySelector(".text-todo").value;
      const confirmation = confirm(`Are you sure you want to delete "${task}" task?`);
      if (!confirmation) return;
      const status = await deleteViaAPI(e.target.closest(".list-group-item").dataset.id)
      if (!status) return;
      e.target.closest(".list-group-item").remove();
      saveAllTodo();
    }

    if (e.target.classList.contains("btn-warning")) {
      const li = e.target.closest(".list-group-item");
      const input = li.querySelector(".text-todo");
      input.removeAttribute("readonly");
      input.focus();
      document.querySelector(".save-hint").classList.remove("invisible")
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.value
    );

    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = async () => {
    ulTodo.innerHTML = "<div class='text-center'>Fetching Todos...</div>";
    axiosInstance.get("/todos", {
      params: {
        _limit: 10
      }
    }).then((response) => {
      ulTodo.innerHTML = "";
      response.data.forEach((todo) => createTodo(todo.title, todo.id));
      showToast('success', 'Todos loaded successfully! Status Code: ' + response.status)
    }).catch((error) => {
      ulTodo.innerHTML = "<div class='text-center'>Failed to fetch Todos</div>";
      showToast('danger', 'Failed to fetch Todos! Status Code: ' + response.status + "\n" + error.message)
    });
  };


  const editViaAPI = async (title, id) => {
    axiosInstance.patch(`/todos/${id}`, {
      title
    }).then((response) => {
      showToast('success', `Todo ${id} patched successfully! Status Code: ` + response.status)
      return true
    }).catch((error) => {
      showToast('danger', 'Failed to update Todo! Status Code: ' + response.status + "\n" + error.message)
      return false
    });
  };

  const addViaAPI = async (title) => {
    try {
      const response = await axiosInstance.post('/todos', {
        title,
        completed: false
      });
      showToast('success', 'Todo added successfully! Status Code: ' + response.status);
      return {
        id: response.data.id,
        status: true
      };
    } catch (error) {
      showToast('danger', 'Failed to add Todo! Status Code: ' + (error.response?.status || "Unknown") + "\n" + error.message);
      return {
        status: false
      };
    }
  };


  const deleteViaAPI = async (id) => {
    try {
      const response = await axiosInstance.delete(`/todos/${id}`);
      showToast('success', `Todo ${id} deleted successfully! Status Code: ` + response.status);
      return true;
    } catch (error) {
      showToast('danger', 'Failed to delete Todo! Status Code: ' + (error.response?.status || "Unknown") + "\n" + error.message);
      return false;
    }
  };


  const deleteAll = () => {
    if (ulTodo.children.length === 0) {
      showToast('warning', 'No Todos to delete!')
      return;
    };
    const confirmation = confirm("Are you sure you want to delete all tasks?");
    if (!confirmation) return;
    localStorage.removeItem("allTodos");
    ulTodo.innerHTML = "";
    showToast('success', 'All Todos deleted from LocalStorage!')
  };

  const toastElem = document.getElementById('toast')
  const toast = bootstrap.Toast.getOrCreateInstance(toastElem)
  const showToast = (status, message) => {
    toastElem.querySelector('.toast-body').innerText = message
    toastElem.classList.add(`text-bg-${status}`)
    toast.show()
  }

  document.getElementById("delete-all").addEventListener("click", deleteAll);

  loadAllTodo();
});