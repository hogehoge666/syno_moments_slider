import PhotoListPresenter from "../static/photo-list-presenter";

describe('PhotoListPresenter', () => {

    it('should summarize list of photos from Moments', () => {
        const srcList = {
            "data": {
                "list": [
                    {
                        "additional": {
                            "orientation": 1,
                            "orientation_original": 1,
                            "resolution": {
                                "height": 4032,
                                "width": 3024
                            },
                            "thumbnail": {
                                "cache_key": "9431_1610339138",
                                "m": "ready",
                                "preview": "broken",
                                "sm": "ready",
                                "unit_id": 9431,
                                "xl": "ready"
                            }
                        },
                        "enhancement_applied": false,
                        "filename": "IMG_2123.HEIC",
                        "filesize": 1907437,
                        "id": 9431,
                        "indexed_time": 1610371535024,
                        "place": "photo",
                        "time": 1610313594,
                        "type": "photo"
                    },
                    {
                        "additional": {
                            "orientation": 1,
                            "orientation_original": 1,
                            "resolution": {
                                "height": 6000,
                                "width": 4000
                            },
                            "thumbnail": {
                                "cache_key": "9394_1610172030",
                                "m": "ready",
                                "preview": "broken",
                                "sm": "ready",
                                "unit_id": 9394,
                                "xl": "ready"
                            }
                        },
                        "enhancement_applied": false,
                        "filename": "IMG_7882.JPG",
                        "filesize": 14537757,
                        "id": 9394,
                        "indexed_time": 1610204399082,
                        "place": "photo",
                        "time": 1610189163,
                        "type": "photo"
                    },
                    {
                        "additional": {
                            "orientation": 1,
                            "orientation_original": 1,
                            "resolution": {
                                "height": 6000,
                                "width": 4000
                            },
                            "thumbnail": {
                                "cache_key": "9393_1610172025",
                                "m": "ready",
                                "preview": "broken",
                                "sm": "ready",
                                "unit_id": 9393,
                                "xl": "ready"
                            }
                        },
                        "enhancement_applied": false,
                        "filename": "IMG_7876.JPG",
                        "filesize": 14762771,
                        "id": 9393,
                        "indexed_time": 1610204397041,
                        "place": "photo",
                        "time": 1610189118,
                        "type": "photo"
                    }
                ]
            },
            "success": true
        };
        expect(PhotoListPresenter.summarize(srcList)).toEqual([
            {
                "cache_key": "9431_1610339138",
                "id": 9431,
                "time": 1610313594
            },
            {
                "cache_key": "9394_1610172030",
                "id": 9394,
                "time": 1610189163
            },
            {
                "cache_key": "9393_1610172025",
                "id": 9393,
                "time": 1610189118
            }
        ]);
    });
});