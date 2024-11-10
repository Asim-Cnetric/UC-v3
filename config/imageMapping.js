const path = require('path');
const fs = require('fs');

const getImageUrl = (req, category, response) => {
  response = response.map(ids => {
    id = ids._id;
    const relativePath = `/assets/entities/${category}/${id}.png`;
    const absolutePath = path.join(__dirname, '..', 'assets/entities', category, `${id}.png`);
    if (fs.existsSync(absolutePath)) {
      ids["image_url"] = `${req.baseUrl}${relativePath}`;
    } else {
      ids["image_url"] = `${req.baseUrl}/assets/default.png`;
    }
    return ids;
  })
  return response;
};

module.exports = getImageUrl;
