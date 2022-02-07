$(function () {
    $('tbody').on('click', 'input', function () {
        // console.log($(this).prop('checked'));
        var key = $(this).parents('table').find('.switch').prop('id');
        if (flagCounter[key] == 1) {
            // 未完成
            // checked 隐藏
            $(this).prop('checked') && $(this).parents('tr').stop().fadeOut();
        } else if (flagCounter[key] == 2) {
            // 已完成
            // unchecked 隐藏
            $(this).prop('checked') || $(this).parents('tr').stop().fadeOut();
        }
        // if ($(this).prop('checked') && flagCounter[key] == 1) {
        //     $(this).parents('tr').stop().fadeOut();
        // } else if (flagCounter[key] == 2) {
        //     $(this).parents('tr').stop().fadeIn();
        // }
    });
    var flagCounter = {
        // 数值代表第几次点击 
        // 第一次隐藏已完成的项目 显示未完成的项目
        // 第二次隐藏为完成的项目 显示已完成的项目
        // 第三次显示所有的项目
        cvBF: 0,
        cvH: 0,
        bbBF: 0,
        bbH: 0
    }
    $('thead').on('click', '.switch', function () {
        // console.log($(this).prop('id'));
        var key = $(this).prop('id');
        if (flagCounter[key] == 0) {
            // 显示未完成
            $(this).text('未完成<>');
            $(this).parents('table').find('input:checked').parents('tr').stop().toggle();
            flagCounter[key]++;
        }
        else if (flagCounter[key] == 1) {
            $(this).text('已完成<>');
            $(this).parents('table').find('tbody tr').stop().toggle();
            $(this).parents('table').find('input:checked').parents('tr').stop().show();
            flagCounter[key]++;
        }
        else if (flagCounter[key] == 2) {
            $(this).text('是否完成<>');
            $(this).parents('table').find('tbody tr').stop().toggle();
            $(this).parents('table').find('input:checked').parents('tr').stop().toggle();
            flagCounter[key] = 0;
        }
    });
})