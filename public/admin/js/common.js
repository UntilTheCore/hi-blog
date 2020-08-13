// 处理表单数据转为json对象形式。
function serializeToJson(objArray) {
    var tempObj = {};
    objArray.forEach(item => {
        tempObj[item.name] = item.value;
    });
    return tempObj;
}