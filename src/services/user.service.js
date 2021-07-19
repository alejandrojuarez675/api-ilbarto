import Users from './../models/user.model';

const findUserByEmail = async (userEmail) => {
    const user = await Users.findOne({email: userEmail});
    if (!user) throw 'User not found';
    return user;
};

const isAdmin = async (userEmail) => {
    const user = await findUserByEmail(userEmail);
    return !!user.isAdmin;
};

const getManagedShopsByUserEmail = async (userEmail) => {
    const shops = await Users.aggregate([
        {$match: {email: userEmail}},
        {$project: {_id:0, rols:1}},
        {$lookup: {
                from: 'shops',
                localField: 'rols.shopId',
                foreignField: '_id',
                as: 'shops'
            }
        },
        {$project: {'shops.name':1}}
    ]);
    return shops.flatMap(x => x.shops.flatMap(y => y.name));
};

export {
    findUserByEmail,
    isAdmin,
    getManagedShopsByUserEmail,
};

