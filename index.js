const USERS_URL = "https://jsonplaceholder.typicode.com/todos"

const ul = document.querySelector('.ul_text')
const input = document.querySelector('.input')


const getTodos = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?&_limit=10")
        const res = await response.json()

        res.forEach(element => {
            // СОЗДАНИЕ ВСЕХ ЭЛЕМЕНТОВ
            const checkbox = document.createElement('input')
            const li = document.createElement("li");
            const p = document.createElement("p");
            const btnDel = document.createElement("button");
            btnDel.className = "btn_del"

            // ОТРИСОВКА НА СТРАНИЦЕ
            p.textContent = element.title;
            checkbox.type = "checkbox"
            checkbox.checked = element.completed
            li.style.listStyle = "none"
            btnDel.textContent = "DELETE"
            li.append(checkbox)
            li.append(p)
            li.append(btnDel);
            ul.append(li);

            btnDel.addEventListener("click", () => {
                deleteUser(element.id, li)
            })
            // if (!element.completed) {
            //     p.style.textDecoration = "none";
            //     p.style.opacity = "1";
            // } else {
            //     p.style.textDecoration = "line-through";
            //     p.style.opacity = "0.5";
            // }

            // СТИЛИ НЕ СРАБАТЫВАЮТ

            //ИЗМЕНЕНИЕ СТИЛЕЙ ПО КЛИКУ НА ЧЕКБОКС
            checkbox.addEventListener('change', (e) => {
                handleChange(element.id, element)
                if (element.completed) {
                    p.style.textDecoration = "none";
                    e.target.parentElement.style.opacity = "1";
                } else {
                    p.style.textDecoration = "line-through";
                    e.target.parentElement.style.opacity = "0.5";
                }
            })
        });

    } catch (error) {
        console.log(error)
    }
}
getTodos()

//КЛИК ДОБАВЛЕНИЯ
const btnAdd = document.querySelector(".btn_add")
btnAdd.addEventListener("click", () => {
    addUser(input.value)
    getTodos()
})


//УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
const deleteUser = async (id, parentElement) => {
    const response = await fetch(`${USERS_URL}/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        console.log("ПОЛЬЗОВАТЕЛЬ УСПЕШНО УДАЛЕН")
        parentElement.remove()
    }

}
//ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
const addUser = async (text) => {
    const response = await fetch(USERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ title: text, completed: true })
    })
    if (response.ok) {
        console.log("ПОЛьЗОВАТЕЛЬ УСПЕШНО ДОБАВЛЕН")
    }

}

// ИЗМЕНЕНИЕ ПОЛЬЗОВАТЕЛЯ 
const handleChange = async (id, key) => {
    const response = await fetch(`${USERS_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ completed: true })
    })
    if (response.ok) {
        console.log("ПОЛЬЗОВАТЕЛЬ УСПЕШНО ИЗМЕНЕН")
        key.completed = !key.completed
    }
}