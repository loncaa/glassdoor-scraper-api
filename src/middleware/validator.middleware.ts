export function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new Error('Body payload is not valid, please check documentation.');
    }

    next();
  };
}
