const viewer = new Cesium.Viewer("cesiumContainer"); // 显示背景的
viewer.baseLayerPicker.viewModel.selectedImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[14]; // 初始选择地球，3 or 14
viewer._cesiumWidget._creditContainer.style.display = "none"; // 去除版权

let czmlDataSource = new Cesium.CzmlDataSource();
viewer.dataSources.add(czmlDataSource);

// reset按钮的功能
function reset() {
    const container = document.getElementById('checkboxContainer');
    // 清空容器内容
    container.innerHTML = '';
    // 移除并销毁当前的 czmlDataSource
    viewer.dataSources.remove(czmlDataSource, true);
    // 把第一个选项框里的内容改为默认的Satellite
    let selectElement = document.getElementById('TLE_Selection');
    selectElement.value = "0";
    // 把搜索框里的内容清空
    selectElement = document.getElementById('searchBox');  
    selectElement.value = '';
}

// submit按钮的功能
function submit() {
    // 获得已选内容的编号的数组
    let container = document.getElementById('checkboxContainer');
    let checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
    let selectedValues = Array.from(checkboxes).map(checkbox => checkbox.value);
    // 放到显示Satellite和Ground Station的函数里
    show(selectedValues);
}

function show(selectedValues) {
    // 移除并销毁当前的 czmlDataSource
    viewer.dataSources.remove(czmlDataSource, true);
    
    // 如果没有选择任何Satellite和Ground Station，直接返回
    if (selectedValues.length == 0) {
        return;
    }

    // 创建新的 czmlDataSource 并添加到 viewer 中
    czmlDataSource = new Cesium.CzmlDataSource();
    viewer.dataSources.add(czmlDataSource);

    czmlDataSource.load('../test_data/constellation/Kuiper.czml').then(function () {
        // 过滤CZML实体，只显示特定的Satellite
        const entities = czmlDataSource.entities.values;
        let num = 1;

        // 如果ALL被勾选，则显示所有的Satellite/Ground Station
        if (selectedValues[0] == "1256") {
            // 获取单选框中选的是Satellite还是Ground Station
            let selectElement = document.getElementById('TLE_Selection');
            let selectedType = selectElement.options[selectElement.selectedIndex].value;
            // 选Ground Station
            if (selectedType == "1") {
                for (let i = 0; i < 1156; i++) {
                    const entity = entities[i];
                    entity.show = false;
                }
            }
            // 选Satellite
            else if (selectedType == "0") {
                for (let i = 1156; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.show = false;
                }
            }
            return;
        }

        // 把所有的显示全部改为false
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            entity.show = false;
        }

        // 使用好一点的算法把选中的Satellite和Ground Station改为true
        let j = 0;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            num = selectedValues[j];
            if (i < num) {
                continue;
            }
            else if (i == num) {
                entity.show = true;
                j++;
            }
        }
    });
}