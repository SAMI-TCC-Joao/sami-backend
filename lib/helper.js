const capitalize = (value) => {
  if (typeof value !== 'string') return '';
  const _value = value.trim();
  return _value.charAt(0).toUpperCase() + _value.slice(1);
};

const removeSpecialChar = (s, trim) => {
  let r = s.toLowerCase();
  r = r.replace(new RegExp('\\s', 'g'), '');
  r = r.replace(new RegExp('[àáâãäå]', 'g'), 'a');
  r = r.replace(new RegExp('æ', 'g'), 'ae');
  r = r.replace(new RegExp('ç', 'g'), 'c');
  r = r.replace(new RegExp('[èéêë]', 'g'), 'e');
  r = r.replace(new RegExp('[ìíîï]', 'g'), 'i');
  r = r.replace(new RegExp('ñ', 'g'), 'n');
  r = r.replace(new RegExp('[òóôõö]', 'g'), 'o');
  r = r.replace(new RegExp('œ', 'g'), 'oe');
  r = r.replace(new RegExp('[ùúûü]', 'g'), 'u');
  r = r.replace(new RegExp('[ýÿ]', 'g'), 'y');
  r = r.replace("'", '');
  r = r.replace('´', '');
  r = r.replace('`', '');

  if (trim) r = r.replace(new RegExp('\\W', 'g'), '');

  return r;
};

const getExtension = (fileName) => {
  const init = fileName.indexOf('.');
  const end = fileName.length;

  if (init && end) return fileName.substr(init, end);

  return '';
};

const prepareDoc = (cpfCnpj) => cpfCnpj?.replace(/[,-./]/g, '');

const checkCpf = (strCPF, allowEqualDigits = false) => {
  let sum;
  let rest;
  sum = 0;

  if (strCPF.length < 11) return false;

  if (!allowEqualDigits && strCPF[0].repeat(11) === strCPF) return false;

  [...Array(9)].forEach((e, i) => {
    sum += parseInt(strCPF.substring(i, i + 1), 10) * (11 - (i + 1));
  });

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(strCPF.substring(9, 10), 10)) return false;
  sum = 0;

  [...Array(10)].forEach((e, i) => {
    sum += parseInt(strCPF.substring(i, i + 1), 10) * (12 - (i + 1));
  });

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(strCPF.substring(10, 11), 10);
};

const checkCnpj = (strCnpj) => {
  let numbers;
  let digits;
  let sum;
  let result;
  let pos;
  let size;
  let EqDigits;
  EqDigits = 1;

  if (strCnpj.length < 14) return false;

  [...Array(strCnpj.length)].forEach((e, i) => {
    if (strCnpj.charAt(i - 1) !== strCnpj.charAt(i)) {
      EqDigits = 0;
    }
  });

  if (!EqDigits) {
    size = strCnpj.length - 2;
    numbers = strCnpj.substring(0, size);
    digits = strCnpj.substring(size);
    sum = 0;
    pos = size - 7;

    [...Array(size)].forEach((e, i) => {
      sum += numbers.charAt(i) * pos--;
      if (pos < 2) pos = 9;
    });

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (Number(result) !== Number(digits.charAt(0))) return false;
    size += 1;
    numbers = strCnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    [...Array(size)].forEach((e, i) => {
      sum += numbers.charAt(i) * pos--;
      if (pos < 2) pos = 9;
    });

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return Number(result) === Number(digits.charAt(1));
  }

  return false;
};

const dynamici18nString = (message, res) => {
  if (message && typeof message === 'string') {
    return message.search(/[a-z]\.[a-z]/i) >= 0 ? res.__(message) : message;
  }

  return '';
};

const IsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const generateOSNum = (idOrderService) => {
  const pad = '0000';
  const os = (pad + idOrderService).slice(-4);

  return `OS.${os}`;
};

const asyncForEach = (array, callback) => {
  return Promise.all(array.map((item, index) => callback(item, index, array)));
};

const asyncFilter = async (arr, predicate) =>
  Promise.all(arr.map(predicate)).then((results) =>
    arr.filter((_v, index) => results[index])
  );

const makeRefurbishFileUrl = (refurbish, userType, file, isPreview) => {
  const projectType = refurbish.idStatus >= 5 ? 'projetos' : 'oportunidades';
  const userPrefix = userType === 'customer' ? 'cliente' : 'profissional';

  const defaultUrl = `/${userPrefix}/${projectType}/perfil/${refurbish.id}`;
  const customer = `/${userPrefix}`;
  const emailUrls = {
    operator: defaultUrl,
    provider: defaultUrl,
    customer,
  };

  return `${emailUrls}/arquivos?arquivo=${file.id}${
    isPreview ? '&visualizar' : ''
  }`;
};

const parseRouteToModel = (route) => {
  return route
    .replace(/ /g, '')
    .split('-')
    .reduce((acc, curr) => acc + capitalize(curr), '');
};

// ie ?,=,&,/ etc https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
const containsEncodedComponents = (x) => decodeURI(x) !== decodeURIComponent(x);

const slugify = (str) =>
  str
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-/\s]/g, '')
    .replace(/\//g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

const filterAttributes = (data, attributes) =>
  data && data.length && attributes && attributes.length
    ? data.map((group) =>
        Object.entries(group)
          .filter(([key]) => attributes.includes(key))
          .reduce(
            (result, [key, value]) => Object.assign(result, { [key]: value }),
            {}
          )
      )
    : [];

// eslint-disable-next-line no-restricted-globals
const isNumber = (n) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

const padLeft = (number, pad = '0000') => (pad + number).slice(pad.length * -1);

const diffObject = (a, b) => {
  return Object.keys(b).reduce((diff, key) => {
    if (a[key] === b[key] || key === 'lastModifiedBy' || key === 'createdAt')
      return diff;
    const { oldData, newData } = diff;
    return {
      oldData: { ...oldData, [key]: a[key] },
      newData: { ...newData, [key]: b[key] },
    };
  }, {});
};

const prepareSession = ({
  id,
  name,
  email,
  idCompany,
  userType,
  type,
  isOwner,
  MGMCode,
  groupPermission,
  isActive,
  limitAccess,
  company,
}) => ({
  id,
  name,
  email,
  idCompany,
  userType,
  type,
  isOwner,
  MGMCode,
  groupPermission,
  isActive,
  limitAccess,
  idPlan: company?.idPlan,
});

const splitList = (inputArray, perChunk) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    const resultArrayCopy = [...resultArray];

    if (!resultArray[chunkIndex]) {
      resultArrayCopy[chunkIndex] = [];
    }

    resultArrayCopy[chunkIndex].push(item);

    return resultArrayCopy;
  }, []);
};

const findValue = (arr, predicate) => {
  if (Array.isArray(arr) === false) return null;

  let response = null;
  arr.some((item) => {
    response = predicate(item);
    return !!response;
  });

  return response;
};

const extractValueFromWhere = (where, property) => {
  if (!where) return null;

  if (where[property]) return where[property];

  return findValue(where.or, (or) => or[property]);
};

export default {
  capitalize,
  removeSpecialChar,
  getExtension,
  prepareDoc,
  checkCpf,
  checkCnpj,
  dynamici18nString,
  IsJsonString,
  generateOSNum,
  asyncForEach,
  asyncFilter,
  makeRefurbishFileUrl,
  parseRouteToModel,
  slugify,
  containsEncodedComponents,
  filterAttributes,
  isNumber,
  padLeft,
  diffObject,
  prepareSession,
  splitList,
  findValue,
  extractValueFromWhere,
};
