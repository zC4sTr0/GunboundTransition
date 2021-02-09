function addNotify(text, color = "#d5fb708a"){
    let notify = document.createElement('div');
    notify.classList.add('notify');
    notify.textContent = text;
    notify.style.backgroundColor = color;
    document.getElementById('notification').appendChild(notify);
};


export default addNotify;