$(function () {
    // genJson();
    $(window).one('load',)
    loadLocalStorage();
    $('tbody').on('change', 'input', function () {
        var cName = $(this).parents('tbody').prop('class');
        // console.log(cName);
        var index = $(this).parents('tr').index()
        // console.log(index);
        var data = getLocalStorage(cName);
        // console.log(data);
        data[index].done = $(this).prop('checked');
        // console.log(data[index]);
        saveLocalStorage(cName, data);
    });

    function getLocalStorage(name) {
        var data = localStorage.getItem(name);
        if (data) {
            data = JSON.parse(data);
            return data;
        } else {
            return null;
        }
    }
    function saveLocalStorage(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }
    function loadLocalStorage() {
        var search = ['cvBackFill', 'cvHit', 'bbBackFill', 'bbHit'];
        // $('.' + search[i]).find('tr').eq(data[j].id).find('input').prop('checked', data[j].done);
        for (var i = 0; i < search.length; i++) {
            var data = getLocalStorage(search[i]);
            for (var j = 0; j < data.length; j++) {
                // console.log(search[i] + ':-> id:' + data[j].id + '-> done:' + data[j].done);
                $('.' + search[i]).find('tr').eq(data[j].id).find('input').prop('checked', data[j].done);
                // console.log($('.' + search[i]).find('tr').eq(data[j].id).find('input').prop('checked'));
                // console.log('data[j].id' + data[j].id);
            }
        }

    }
    function genJson() {
        $.each($('tbody'), function (i, ele) {
            // console.log($(ele).prop('class').substr(6));
            var data = [];
            // console.log($(ele).find('tr'));
            // console.log(data);
            $.each($(ele).find('tr'), function (i, e) {
                // console.log('id:' + $(e).index());
                // console.log('done:' + $(e).find('input').prop('checked'));
                data.push({
                    id: $(e).index(),
                    done: $(e).find('input').prop('checked')
                });
            })
            saveLocalStorage($(ele).prop('class'), data);
        })
    }
    function updateJson(obj, index, staue) {
        obj[index].done = staue;
    }
})