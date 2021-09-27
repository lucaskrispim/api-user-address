const addressCreate = {
  street: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 50
      },
    },
    errorMessage: 'Campo nome da rua inválido!',
  },
  number: {
    in: 'body',
    isInt: {
      min: 1
    },
    isNegative: false,
    errorMessage: 'Campo número inválido!',
  },
  zip_code: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 20
      },
    },
    errorMessage: 'Campo CEP inválido!',
  }
}

const addressModify = {
  id: {
    in: 'query',
    optional: {
      options: { nullable: false, checkFalsy: false }
    },
    isUUID: true,
    isLength: {
      options: {
        min: 36,
        max: 36
      },
    },
    errorMessage: 'id do endereço não é um id válido!',
  },
  street: {
    in: 'body',
    optional: {
      options: { nullable: true, checkFalsy: true }
    },
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 50
      },
    },
    errorMessage: 'Campo nome da rua inválido!',
  },
  number: {
    in: 'body',
    optional: {
      options: { nullable: true, checkFalsy: true }
    },
    isInt: {
      min: 1
    },
    isNegative: false,
    errorMessage: 'Campo número inválido!',
  },
  zip_code: {
    in: 'body',
    optional: {
      options: { nullable: true, checkFalsy: true }
    },
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 20
      },
    },
    errorMessage: 'Campo CEP inválido!',
  }
}

const addressDelete = {
  id: {
    in: 'query',
    optional: {
      options: { nullable: false, checkFalsy: false }
    },
    isUUID: true,
    isLength: {
      options: {
        min: 36,
        max: 36
      },
    },
    errorMessage: 'id do endereço não é um id válido!',
  }
}

module.exports = { addressCreate, addressModify, addressDelete }