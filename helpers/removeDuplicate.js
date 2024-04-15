// Your original data
const data = [
    {
        nameNay: [
            {
                name: { name: 'Women' },
            },
            {
                name: { name: 'Men' },
            },
            {
                name: { name: 'Women' },
            },
        ],
    },
];

// Function to remove duplicates
// function removeDuplicates(data) {
//     data.forEach((item) => {
//         const uniqueNames = new Set();
//         item.nameNay = item.nameNay.filter((entry) => {
//             const name = entry.name.name;
//             if (!uniqueNames.has(name)) {
//                 uniqueNames.add(name);
//                 return true;
//             }
//             return false;
//         });
//     });
//     return data;
// }

function convertToSingleObject(data) {
    return data.map((item) => {
        const names = item.nameNay.map((entry) => entry.name.name);
        return { nameNay: [{ name: names }] };
    });
}

function convertToArray(data) {
    const uniqueNames = new Set();
    const namesArray = data.reduce((acc, entry) => {
        const name = entry.name.name;
        if (!uniqueNames.has(name)) {
            uniqueNames.add(name);
            acc.push(name);
        }
        return acc;
    }, []);

    return [{ name: namesArray }];
}
// const Product_Genders = {
//     Product_Genders: [
//         {
//             id: 1,
//             genderId: 1,
//             Genders: [{ name: 'Women' }],
//         },
//         {
//             id: 2,
//             genderId: 2,
//             Genders: [{ name: 'Men' }],
//         },
//     ],
// };

// function simplifyData(data) {
//     const simplifiedGenders = data.Product_Genders.map((entry) => entry.Genders[0].name);
//     return { Product_Genders: [{ Genders: simplifiedGenders }] };
// }
export function simplifyData(data) {
    const simplifiedData = data.map((entry) => ({
        Product_Genders: entry.Product_Genders.map((gender) => gender.Genders[0].name),
    }));
    return simplifiedData;
}

// const simplifiedData = simplifyData(Product_Genders);
// console.log(JSON.stringify(Product_Genders, null, 2));

// Call the function to remove duplicates
// const newData = convertToSingleObject(data);
// console.log(JSON.stringify(newData, null, 2));
