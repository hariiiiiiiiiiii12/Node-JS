const authAdmin = (req, res, next) => {
  const token = 'xyasfasfz';
  if (token === 'xyz') {
    console.log('Request to admin api is authorized');
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = {
  authAdmin: authAdmin,
};
