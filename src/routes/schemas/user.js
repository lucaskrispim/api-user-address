const userCreate = {
  name: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 40
      },
    },
    errorMessage: 'Campo nome inválido!',
  },
  email: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 50
      },
    },
    errorMessage: 'Campo email inválido!',
  },
  phone_number: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 8,
        max: 20
      },
    },
    errorMessage: 'Campo número de telefone inválido!',
  },
  password: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 15
      },
    },
    errorMessage: 'Campo password inválido!',
  },
}

const userLogin = {
  name: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 40
      },
    },
    errorMessage: 'Campo nome inválido!',
  },
  password: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 10
      },
    },
    errorMessage: 'Campo password inválido!',
  },
}

const userModify = {
  name: {
    in: 'body',
    optional: {
      options: { nullable: true, checkFalsy: true }
    },
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 40
      },
    },
    errorMessage: 'Campo nome inválido!',
  },
  email: {
    in: 'body',
    optional: {
      options: { nullable: true, checkFalsy: true }
    },
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 50
      },
    },
    errorMessage: 'Campo email inválido!',
  },
  phone_number: {
    in: 'body',
    optional: {
      options: { nullable: true, checkFalsy: true }
    },
    isString: true,
    isLength: {
      options: {
        min: 8,
        max: 20
      },
    },
    errorMessage: 'Campo número de telefone inválido!',
  },
  password: {
    in: 'body',
    optional: {
      options: { nullable: true, checkFalsy: true }
    },
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 15
      },
    },
    errorMessage: 'Campo password inválido!',
  },
}

module.exports = { userCreate, userLogin, userModify }