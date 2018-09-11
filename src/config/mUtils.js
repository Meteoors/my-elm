//获取localStorage
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

export const setStore = (name, value) => {
    window.localStorage.setItem(name, value);
}

export const removeStore = name => {
    window.localStorage.removeItem(name);
}