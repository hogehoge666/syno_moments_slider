class PhotoListPresenter {
    static present(momentsRawList) {
        const presentableListInDescendingOrder = this.summarize(momentsRawList);
        return presentableListInDescendingOrder.reverse();
    }

    static summarize(momentsRawList) {
        return momentsRawList.data.list.map((value, key, array) => {
            return {
                cache_key: value.additional.thumbnail.cache_key,
                time: value.time,
                id: value.id
            }
        });
    }
}

export default PhotoListPresenter;