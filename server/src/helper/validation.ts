const isValidInfo = (req, _res, next) => {
    if (!req.body.hasOwnProperty('title')) throw new Error('There is no title');
    if (!req.body.hasOwnProperty('description')) throw new Error('There is no description');
    if (!req.body.hasOwnProperty('logo')) throw new Error('There is no logo');
  
    const { title, description, logo } = req.body;
  
    if (!title.length) throw new Error('Title is empty');
    if (!description.length) throw new Error('Description is empty');
    if (!logo.length) throw new Error('Logo is not existed');
  
    next();
}

const isValidEmail = (req, _res, next) => {
    if (!req.body.hasOwnProperty('useremail')) throw new Error('There is no email');
  
    const { useremail } = req.body; 
  
    if (!useremail.length) throw new Error('Email is empty');
    if (!/^[\w]+@[a-z]+\.[a-z]{2,4}/gm.test(useremail)) throw new Error('Email is invalid');
  
    next();
}
  
export { isValidInfo, isValidEmail };