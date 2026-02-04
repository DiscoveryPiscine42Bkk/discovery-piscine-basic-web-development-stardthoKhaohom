var ft_list = document.getElementById('ft_list');
var newBtn = document.getElementById('newBtn');

newBtn.addEventListener('click', function() {
    var text = prompt("What do you want to do?");

    if (text && text.trim() !== "") {
        addTodo(text);
        saveCookie();
    }
});

function addTodo(text) {
    var div = document.createElement('div');
    div.className = 'todo-item'; 
    div.innerHTML = text;

    div.addEventListener('click', function() {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();
            saveCookie();
        }
    });

    ft_list.prepend(div);
}

function saveCookie() {
    var todos = [];
    var items = ft_list.querySelectorAll('.todo-item');

    items.forEach(function(item) {
        todos.unshift(item.innerHTML); 
    });

    var jsonStr = JSON.stringify(todos);

    var d = new Date();
    d.setTime(d.getTime() + (72460601000));
    var expires = "expires="+ d.toUTCString();

    document.cookie = "ft_list=" + jsonStr + ";" + expires + ";path=/";
}

function loadCookie() {
    var name = "ft_list=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var jsonStr = c.substring(name.length, c.length);
            try {
                var todos = JSON.parse(jsonStr);
                if (Array.isArray(todos)) {
                    todos.forEach(function(text) {
                        addTodo(text);
                    });
                }
            } catch (e) {
                console.log("Cookie error");
            }
            return;
        }
    }
}

loadCookie();