export const getFileNameFromUrl = (imageUrl) => {
    const path = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const publicId = path.split('.')[0];
    const parts = imageUrl.split('/');
    const pathSegment = parts.slice(7, 8);
    const fileName = pathSegment + '/' + publicId;

    return fileName;
};
