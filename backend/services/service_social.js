const socialSchema = require('../schema/social_schema');

exports.createSocial = async (socialData) => {
    const newSocial = new Social(socialData);
    return await newSocial.save();
};