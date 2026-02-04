$(document).ready(function() {
    loadTodoList();

    $('#newBtn').click(function() {
        var todoText = prompt("Enter a new TO DO:");
        
        if (todoText && todoText.trim() !== "") {
            addTodo(todoText);
            saveCookie();
        }
    });

    function addTodo(text) {
        var $todoDiv = $('<div></div>').text(text).addClass('todo-item');

        $todoDiv.click(function() {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove();
                saveCookie();
            }
        });

        $('#ft_list').prepend($todoDiv);
    }

    function saveCookie() {
        var todos = [];

        $('#ft_list').children().each(function() {
            todos.unshift($(this).text());
        });

        var jsonStr = JSON.stringify(todos);
        document.cookie = "ft_list=" + encodeURIComponent(jsonStr) + "; path=/; max-age=31536000";
    }

    function loadTodoList() {
        var cookies = document.cookie.split(';');
        var listCookie = cookies.find(c => c.trim().startsWith("ft_list="));

        if (listCookie) {
            var jsonStr = listCookie.split('=')[1];
            try {
                var todos = JSON.parse(decodeURIComponent(jsonStr));
                
                $.each(todos, function(index, value) {
                    addTodo(value);
                });
            } catch (e) {
                console.log("Cookie error");
            }
        }
    }
});