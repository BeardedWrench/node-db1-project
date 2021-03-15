const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try{
    !req.body.name || !req.body.budget ?
    res.status(400).json({ message: 'name and budget are required.'})
    :
    typeof req.body.name !== 'string' ?
    res.status( 400 ).json({ message: 'name of account must be a string.'})
    :
    typeof req.body.budget !== 'number' ?
    res.status( 400 ).json({ message: 'budget of account must be a number' })
    :
    req.body.name.trim().length < 3 || req.body.name.trim.length > 100  ?
    res.status( 400 ).json({ message: 'name of account must be between 3 and 100' })
    :
    req.body.budget < 0 || req.body.budget > 100000 ?
    res.status( 400 ).json({ message: 'budget of account is too large or too small.' })
    :
    next();
  }
  catch( err ){
    next( err );
  }
    
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts = await Accounts.getAll();
    const accountName = req.body.name.trim();

    const results = accounts.filter( account => {
      return account.name === accountName;
    } )

    results.length > 0 ? res.status( 400 ).json({ message: 'That name is taken' }) : next();
  }
  catch( err ){
    next( err )
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accountChecked = await Accounts.getById( req.params.id )
    accountChecked ? next() : res.status( 404 ).json({ message: 'Account not found.' })
  }
  catch( err ){
    next( err )
  }
}
