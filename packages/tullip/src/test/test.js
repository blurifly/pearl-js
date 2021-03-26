const temp1 = document.createElement('div')
const temp2 = document.createElement('div')
const temp3 = document.createElement('div')


setTimeout(() => {
    if (count <= 1) {
        temp1.replaceWith(temp2)
    } else if (count > 1) {
        temp1.replaceWith(temp3)
    }
}, 20000);