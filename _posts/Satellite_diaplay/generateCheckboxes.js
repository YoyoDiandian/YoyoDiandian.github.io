// 生成多选框的函数
function generateCheckboxes(containerId, numberOfCheckboxes, selectedValue) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // 清空容器内容，否则每次点select都会把新的选项加在原有选项后面

    // 选项的初始值
    let i = 0;

    // 根据select是Satellite还是Ground Station来选择选项框里的内容数量
    if (selectedValue == "1") {
        i = 1156;
    }

    // 生成ALL选项框
    const label_all = document.createElement('label');
    const checkbox_all = document.createElement('input');
    checkbox_all.type = 'checkbox';
    checkbox_all.name = 1256;
    checkbox_all.value = 1256;
    label_all.appendChild(checkbox_all);
    label_all.appendChild(document.createTextNode(' ALL'));
    container.appendChild(label_all)

    // 创建复选框
    for (; i <= numberOfCheckboxes; i++) {
        // 创建复选框和标签
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = i;
        checkbox.value = i;

        // 根据i的不同值来看到底是生成Satellite多选框还是Ground Station多选框
        label.appendChild(checkbox);
        if (i < 1156) {
            label.appendChild(document.createTextNode(' Satellite/Kuiper-630 ' + i));
        }
        else {
            label.appendChild(document.createTextNode(' Ground Station/' + i));
        }

        // 将标签添加到容器中
        container.appendChild(label);

        // 监听每个选项，如果有一个选项勾了否，那么ALL就会取消勾选
        checkbox.addEventListener('change', function() {
            if (!checkbox.checked) {
                checkbox_all.checked = false;
            } 
            else {
                const allChecked = Array.from(container.querySelectorAll('input[type="checkbox"]:not(#selectAll)')).every(checkbox => checkbox.checked);
                if (allChecked) {
                    checkbox_all.checked = true;
                }
            }
        });
    }

    // 勾选ALL时可以勾选所有选项
    checkbox_all.addEventListener('change', function() {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]:not(#selectAll)');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checkbox_all.checked;
        });
    });
}

// 多选项的搜索筛选框
function filterCheckboxes() {
    const searchBox = document.getElementById('searchBox');
    const filter = searchBox.value.toLowerCase();
    const container = document.getElementById('checkboxContainer');
    const labels = container.getElementsByTagName('label');

    for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        const text = label.textContent || label.innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
        label.style.display = '';
        }
        else {
        label.style.display = 'none';
        }
    }
}

// 选择Satellite或Ground Station的按钮
function ChoseTLE() {
    let selectElement = document.getElementById('TLE_Selection');
    let selectedValue = selectElement.options[selectElement.selectedIndex].value;
    let numberOfCheckboxes = 0;
    if (selectedValue == "0") {
        numberOfCheckboxes = 1155;
    }
    else{
        numberOfCheckboxes = 1255;
    }
    generateCheckboxes('checkboxContainer', numberOfCheckboxes, selectedValue);
}


