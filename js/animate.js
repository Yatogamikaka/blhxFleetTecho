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
        updataStatueData(myStackCharts);
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
    };
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

    // echarts 图表
    // 点击事件
    $('#displatC').on('click', function () {
        $('.mask').stop().show();
        $('.echarts').stop().show();
    });
    $('.mask,.echarts a').on('click', function () {
        $('.mask').stop().hide();
        $('.echarts').stop().hide();
    });
    var myStackCharts = echarts.init(document.querySelector('.barChart'));
    var myStackOption = {
        title: {
            text: '舰船养成数量'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['航母装填', '航母命中', '战列装填', '战列命中'],
        },
        yAxis: {},
        legend: {
            data: ['已完成', '未完成'],
        },
        grid: {
            left: '5%',
            right: '5%',
            buttom: '0%',
        },
        series: [
            {
                name: '已完成',
                type: 'bar',
                data: [],
                stack: 'x',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: 'black',
                                fontSize: 13
                            }
                        }
                    }
                }
            },
            {
                name: '未完成',
                type: 'bar',
                data: [],
                stack: 'x',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: 'black',
                                fontSize: 13
                            }
                        }
                    }
                }
            },
        ],
    };
    myStackCharts.setOption(myStackOption);

    // setOption的需要的对象
    $('.cbox:first').change();
});
// 写一个函数更新已完成和未完成的数量，每次 input:checked 状态更新都调用这个函数，并重新 setOption
function updataStatueData(echartsObj) {
    var keys = ['cvBackFill', 'cvHit', 'bbBackFill', 'bbHit'];
    var done = [];
    var doing = [];
    var count = 0;
    for (var i = 0; i < keys.length; i++) {
        var temp = getLocalStorage(keys[i]);
        for (var _ in temp) {
            // 获取过来的对象格式如下：
            // {
            //     'id': 1,
            //     'done': true / false
            // }
            // done 属性表面是否已完成，这里只需要 done 属性
            if (temp[_]['done']) {
                count++;
            }
            // console.log(_);
            // console.log(temp[_]['done']);
        }
        done.push(count);
        doing.push(temp.length - count);
        count = 0;
    }
    echartsObj.setOption({
        series: [
            {
                name: '已完成',
                data: done,
            },
            {
                name: '未完成',
                data: doing,
            }
        ]
    });
}