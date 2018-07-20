import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15;
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 100;
function insertArray(arr, val,compare, maxLen) {        //历史记录插入
    const index = arr.findIndex(compare);
    if (index === 0) {
        return;
    }
    if (index > 0) {
        arr.splice(index, 1);
    }
    arr.unshift(val);
    if (arr.length > maxLen) {
        arr.pop();
    }
}
export function saveSearch(query) {         //保存搜索历史
    let searches = storage.get(SEARCH_KEY, []);
    insertArray(searches, query, (item) => {
        return item === query;
    } ,SEARCH_MAX_LENGTH);
    storage.set(SEARCH_KEY, searches);
    return searches;
}
export function loadSearch() {              //加载搜索历史
    return storage.get(SEARCH_KEY, []);
}

export function saveFavorite(song) {        //收藏音乐
    let favoriteList = storage.get(FAVORITE_KEY, []);
    insertArray(favoriteList, song, (item) => {
        return item.id === song.id;
    }, FAVORITE_MAX_LENGTH);
    storage.set(FAVORITE_KEY, favoriteList);
    return favoriteList;
}

export function loadFavorite() {            //加载收藏音乐
    return storage.get(FAVORITE_KEY, []);
}

export function removeFavorite(song) {          //移除收藏音乐
    let favoriteList = storage.get(FAVORITE_KEY, []);
    removeArray(favoriteList, song);
    storage.set(FAVORITE_KEY, favoriteList);
    return favoriteList;
}
function removeArray(arr,val) {             //从数组中移除
    let index = arr.findIndex(item => {
        return item.id === val.id;
    })
    arr.splice(index, 1);
    return arr;
}