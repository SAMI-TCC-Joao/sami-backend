const mockUser = {
  id: 1,
  name: 'teste',
  email: 'teste@email.com',
  password: '$2b$10$i7AWThpWs.AJnx2j/EeT0OG8rFHmwBaivP/1VBq6HWLeidNnxhT9.'
};

const user = {
  findOne: ({ where: { email } }) =>
    email === mockUser.email ? mockUser : null,
  update: (object, { where: { email } }) =>
    email === mockUser.email ? object : null,
};

export default user;
