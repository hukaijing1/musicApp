import * as types from '@/store/mutation-type'
import { saveSearch,saveFavorite,removeFavorite } from '@/common/js/cache'
export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_PLAYING_STATE, true);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYLIST, list);
    commit(types.SET_SEQUENCE_LIST, list);
    commit(types.SET_CURRENT_INDEX, index);
}

export const insertSong = function ({ commit, state },  song ) {
    let playlist = state.playlist.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    let currentSong = playlist[currentIndex];//记录当前歌曲
    let index = findIndex(playlist, song);  //查询是否包含该歌曲
    currentIndex++;
    playlist.splice(currentIndex, 0, song);     //在当前歌曲后插入
    if (index > -1) {
        if (index < currentIndex) {
            playlist.splice(index+1, 1);
        } else {
            playlist.splice(index, 1);
            currentIndex--;
        }
    }

    let sCurrentIndex = findIndex(sequenceList, currentSong)+1;//记录当前歌曲位置
    let sIndex = findIndex(sequenceList, song);
    sequenceList.splice(sCurrentIndex, 0, song);
    if (sIndex > -1) {
        if (sIndex < currentIndex) {
            playlist.splice(sIndex, 1);
        } else {
            playlist.splice(sIndex+1, 1);
        }
    }
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYLIST, playlist);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_PLAYING_STATE, true);
}
function findIndex(array, item) {
    return array.findIndex(value => {
        return item.id === value.id;
    })
}

export const saveSearchHistory=function({ commit }, query){
    commit(types.SET_SEARCHHISTORY, saveSearch(query));
}

export const saveFavoriteList = function ({ commit }, song) {
    commit(types.SET_FAVORITELIST, saveFavorite(song));
}
export const removeFavoriteList = function ({ commit }, song) {
    commit(types.SET_FAVORITELIST, removeFavorite(song));
}