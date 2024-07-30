import { v2 as cloudinary } from 'cloudinary';
// document
// https://cloudinary.com/documentation/admin_api#get_resources

export const getMedia = (nextCursor) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await cloudinary.api.resources(
                {
                    type: 'upload',
                    // prefix: 'images-clothes-web',
                    max_results: 999,
                    next_cursor: nextCursor,
                    direction: 'desc',
                    sort_by: 'created_at',
                },
                function (error, result) {
                    // console.log('here uploader');
                    // console.log('result>>>', result);
                    // console.log('error>>>', error);
                },
            );
            const { resources, next_cursor } = response;

            resolve({
                resources,
                nextCursor: next_cursor,
            });
        } catch (error) {
            reject(error);
        }
    });

export const uploadImage = (images) =>
    new Promise(async (resolve, reject) => {
        try {
            let imageUrls;

            if (images) {
                imageUrls = images?.map((obj) => obj.path);
            }
            resolve({
                response: 'ok',
            });
        } catch (error) {
            reject(error);
        }
    });
