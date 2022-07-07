import locale from './en.json' assert {type: "json"};

const error = {};

const BAD_REQUEST = 400;
const NOT_ALLOWED = 405;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 405;
const TO_MANY_REQUESTS = 427;
const INTERNAL_SERVER_ERROR = 500;
const BAD_GATEWAY = 502;
const SERVICE_UNAVAILABLE = 503;

error.NOT_FOUND = {
  userNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00001',
    message: locale.userNotFound,
  },
  pageNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00002',
    message: locale.pageNotFound,
  },
  stepNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00003',
    message: locale.stepNotFound,
  },
  taskNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00004',
    message: locale.taskNotFound,
  },
  templateNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00005',
    message: locale.templateNotFound,
  },
};

error.UNAUTHORIZED = {
  notAuthorized: {
    statusCode: UNAUTHORIZED,
    code: 'UA-00001',
    message: locale.notAuthorized,
  },
  tokenExpired: {
    statusCode: UNAUTHORIZED,
    code: 'UA-00002',
    message: locale.tokenExpired,
  },
  invalidToken: {
    statusCode: UNAUTHORIZED,
    code: 'REF-00003',
    message: locale.invalidToken,
  },
};

error.NOT_ALLOWED = {
  notUpdated: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00001',
    message: locale.notUpdated,
  },
  supplierCantEdit: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00002',
    message: locale.supplierCantEdit,
  },
  itemsCantEdit: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00003',
    message: locale.itemsCantEdit,
  },
  serviceCantEdit: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00004',
    message: locale.serviceCantEdit,
  },
  cantDelete: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00005',
    message: locale.cantDelete,
  },
  supplierCantDelete: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00006',
    message: locale.supplierCantDelete,
  },
  compositionCantDelete: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00007',
    message: locale.compositionCantDelete,
  },
  itemNotAllowed: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00008',
    message: locale.itemNotAllowed,
  },
  cantCancel: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00009',
    message: locale.cantCancel,
  },
  cantGroup: {
    statusCode: NOT_ALLOWED,
    code: 'NA-00010',
    message: locale.cantGroup,
  },
};

error.INTERNAL_SERVER_ERROR = {
  general: {
    statusCode: INTERNAL_SERVER_ERROR,
    code: 'ISE-00001',
    message: locale.general,
  },
  sentError: {
    statusCode: INTERNAL_SERVER_ERROR,
    code: 'ISE-00002',
    message: locale.sentError,
  },
  noGroup: {
    statusCode: INTERNAL_SERVER_ERROR,
    code: 'ISE-00003',
    message: locale.noGroup,
  },
};

error.BAD_REQUEST = {
  noUser: { statusCode: BAD_REQUEST, code: 'B-00001', message: locale.noUser },
  noEmail: {
    statusCode: BAD_REQUEST,
    code: 'B-00002',
    message: locale.noEmail,
  },
  noPassword: {
    statusCode: BAD_REQUEST,
    code: 'B-00003',
    message: locale.noPassword,
  },
  invalidEmail: {
    statusCode: BAD_REQUEST,
    code: 'B-00004',
    message: locale.invalidEmail,
  },
  uniqueEmail: {
    statusCode: BAD_REQUEST,
    code: 'B-00005',
    message: locale.uniqueEmail,
  },
  invalidCPF: {
    statusCode: BAD_REQUEST,
    code: 'B-00006',
    message: locale.invalidCPF,
  },
  invalidCNPJ: {
    statusCode: BAD_REQUEST,
    code: 'B-00007',
    message: locale.invalidCNPJ,
  },
  noPrice: {
    statusCode: BAD_REQUEST,
    code: 'B-00008',
    message: locale.noPrice,
  },
  noUnit: { statusCode: BAD_REQUEST, code: 'B-00009', message: locale.noUnit },
  uniqueName: {
    statusCode: BAD_REQUEST,
    code: 'HMT-00002',
    message: locale.uniqueName,
  },
  paymentMethodUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00010',
    message: locale.paymentMethodUniqueName,
  },
  materialUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00011',
    message: locale.materialUniqueName,
  },
  materialTypeUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00012',
    message: locale.materialTypeUniqueName,
  },
  brandUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00013',
    message: locale.brandUniqueName,
  },
  serviceUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00014',
    message: locale.serviceUniqueName,
  },
  serviceTypeUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00015',
    message: locale.serviceTypeUniqueName,
  },
  costCenterUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00016',
    message: locale.costCenterUniqueName,
  },
  statusUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00017',
    message: locale.statusUniqueName,
  },
  roomUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00018',
    message: locale.roomUniqueName,
  },
  roomTypeUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00019',
    message: locale.roomTypeUniqueName,
  },
  workTypeUniqueName: {
    statusCode: BAD_REQUEST,
    code: 'B-00020',
    message: locale.workTypeUniqueName,
  },
  noName: { statusCode: BAD_REQUEST, code: 'B-00021', message: locale.noName },
  costCenterNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00023',
    message: locale.costCenterNoName,
  },
  paymentMethodNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00024',
    message: locale.paymentMethodNoName,
  },
  statusNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00025',
    message: locale.statusNoName,
  },
  contractNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00026',
    message: locale.contractNoName,
  },
  brandNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00027',
    message: locale.brandNoName,
  },
  roomNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00028',
    message: locale.roomNoName,
  },
  roomTypeNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00029',
    message: locale.roomTypeNoName,
  },
  materialNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00030',
    message: locale.materialNoName,
  },
  materialTypeNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00031',
    message: locale.materialTypeNoName,
  },
  serviceNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00032',
    message: locale.serviceNoName,
  },
  serviceTypeNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00033',
    message: locale.serviceTypeNoName,
  },
  workTypeNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00034',
    message: locale.workTypeNoName,
  },
  refurbishNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00035',
    message: locale.refurbishNoName,
  },
  compositionNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00036',
    message: locale.compositionNoName,
  },
  budgetNoName: {
    statusCode: BAD_REQUEST,
    code: 'B-00037',
    message: locale.budgetNoName,
  },
  noData: { statusCode: BAD_REQUEST, code: 'B-00038', message: locale.noData },

  // todo rename to notFound when migrating errors and throwing // maybe NOT_FOUND:404 TYPE ?
  brandNoData: {
    statusCode: BAD_REQUEST,
    code: 'B-00039',
    message: locale.brandNoData,
  },
  companyPortfolioNoData: {
    statusCode: BAD_REQUEST,
    code: 'B-00040',
    message: locale.companyPortfolioNoData,
  },
  itemsNoData: {
    statusCode: BAD_REQUEST,
    code: 'B-00041',
    message: locale.itemsNoData,
  },
  //
  noType: { statusCode: BAD_REQUEST, code: 'B-00042', message: locale.noType },
  userNoType: {
    statusCode: BAD_REQUEST,
    code: 'B-00043',
    message: locale.userNoType,
  },
  customerNoType: {
    statusCode: BAD_REQUEST,
    code: 'B-00044',
    message: locale.customerNoType,
  },
  supplierNoType: {
    statusCode: BAD_REQUEST,
    code: 'B-00045',
    message: locale.supplierNoType,
  },
  noRefurbish: {
    statusCode: BAD_REQUEST,
    code: 'B-00046',
    message: locale.noRefurbish,
  },
  noAccount: {
    statusCode: BAD_REQUEST,
    code: 'B-00047',
    message: locale.noAccount,
  },
  serviceMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00048',
    message: locale.serviceMaxLength,
  },
  itemsMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00049',
    message: locale.itemsMaxLength,
  },
  refurbishMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00050',
    message: locale.refurbishMaxLength,
  },
  paymentInstalmentMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00051',
    message: locale.paymentInstalmentMaxLength,
  },
  noModel: {
    statusCode: BAD_REQUEST,
    code: 'B-00052',
    message: locale.noModel,
  },
  cantFindUser: {
    statusCode: BAD_REQUEST,
    code: 'B-00053',
    message: locale.cantFindUser,
  },
  invalidCredentials: {
    statusCode: BAD_REQUEST,
    code: 'B-00054',
    message: locale.invalidCredentials,
  },
  noConfirmPassword: {
    statusCode: BAD_REQUEST,
    code: 'B-00055',
    message: locale.noConfirmPassword,
  },
  noNewPassword: {
    statusCode: BAD_REQUEST,
    code: 'B-00056',
    message: locale.noNewPassword,
  },
  noNewConfirmPassword: {
    statusCode: BAD_REQUEST,
    code: 'AUT-00057',
    message: locale.noNewConfirmPassword,
  },
  noPasswordMatch: {
    statusCode: BAD_REQUEST,
    code: 'B-00058',
    message: locale.noPasswordMatch,
  },
  tokenPasswordError: {
    statusCode: BAD_REQUEST,
    code: 'B-00059',
    message: locale.tokenPasswordError,
  },
  errPassword: {
    statusCode: BAD_REQUEST,
    code: 'B-00060',
    message: locale.errPassword,
  },
  minLengthPass: {
    statusCode: BAD_REQUEST,
    code: 'B-00061',
    message: locale.minLengthPass,
  },
  changePasswordError: {
    statusCode: BAD_REQUEST,
    code: 'B-00062',
    message: locale.changePasswordError,
  },
  passwordTokenExpired: {
    statusCode: BAD_REQUEST,
    code: 'B-00063',
    message: locale.tokenExpired,
  },
  lengthPassword: {
    statusCode: BAD_REQUEST,
    code: 'B-00063',
    message: locale.lengthPassword,
  },
  noInstagramData: {
    statusCode: BAD_REQUEST,
    code: 'B-00064',
    message: locale.noInstagramData,
  },
  noInstagramAccessToken: {
    statusCode: BAD_REQUEST,
    code: 'B-00065',
    message: locale.noInstagramAccessToken,
  },
  noPhone: {
    statusCode: BAD_REQUEST,
    code: 'B-00066',
    message: locale.noPhone,
  },
  noCPF: { statusCode: BAD_REQUEST, code: 'B-00067', message: locale.noCPF },
  noRG: { statusCode: BAD_REQUEST, code: 'B-00068', message: locale.noRG },
  noZipcode: {
    statusCode: BAD_REQUEST,
    code: 'B-00069',
    message: locale.noZipcode,
  },
  noStreet: {
    statusCode: BAD_REQUEST,
    code: 'B-00070',
    message: locale.noStreet,
  },
  noNumber: {
    statusCode: BAD_REQUEST,
    code: 'B-00071',
    message: locale.noNumber,
  },
  noState: {
    statusCode: BAD_REQUEST,
    code: 'B-00072',
    message: locale.noState,
  },
  noCity: { statusCode: BAD_REQUEST, code: 'B-00073', message: locale.noCity },
  noNeighborhood: {
    statusCode: BAD_REQUEST,
    code: 'B-00074',
    message: locale.noNeighborhood,
  },
  noCNPJ: { statusCode: BAD_REQUEST, code: 'B-00075', message: locale.noCNPJ },
  noCompanyName: {
    statusCode: BAD_REQUEST,
    code: 'B-00076',
    message: locale.noCompanyName,
  },
  noTrademarkName: {
    statusCode: BAD_REQUEST,
    code: 'B-00077',
    message: locale.noTrademarkName,
  },
  noCompanyZipcode: {
    statusCode: BAD_REQUEST,
    code: 'B-00078',
    message: locale.noCompanyZipcode,
  },
  noCompanyStreet: {
    statusCode: BAD_REQUEST,
    code: 'B-00079',
    message: locale.noCompanyStreet,
  },
  noCompanyNumber: {
    statusCode: BAD_REQUEST,
    code: 'B-00080',
    message: locale.noCompanyNumber,
  },
  noCompanyState: {
    statusCode: BAD_REQUEST,
    code: 'B-00081',
    message: locale.noCompanyState,
  },
  noCompanyCity: {
    statusCode: BAD_REQUEST,
    code: 'B-00082',
    message: locale.noCompanyCity,
  },
  noCompanyNeighborhood: {
    statusCode: BAD_REQUEST,
    code: 'PRO-00083',
    message: locale.noCompanyNeighborhood,
  },
  noBirthdate: {
    statusCode: BAD_REQUEST,
    code: 'B-00084',
    message: locale.noBirthdate,
  },
  noExperience: {
    statusCode: BAD_REQUEST,
    code: 'B-00085',
    message: locale.noExperience,
  },
  noBank: { statusCode: BAD_REQUEST, code: 'B-00086', message: locale.noBank },
  noAgency: {
    statusCode: BAD_REQUEST,
    code: 'B-00087',
    message: locale.noAgency,
  },
  noDocument: {
    statusCode: BAD_REQUEST,
    code: 'B-00088',
    message: locale.noDocument,
  },
  noSize: { statusCode: BAD_REQUEST, code: 'B-00089', message: locale.noSize },
  noOrder: {
    statusCode: BAD_REQUEST,
    code: 'B-00090',
    message: locale.noOrder,
  },
  errAmount: {
    statusCode: BAD_REQUEST,
    code: 'B-00091',
    message: locale.errAmount,
  },
  noCompany: {
    statusCode: BAD_REQUEST,
    code: 'B-00092',
    message: locale.noCompany,
  },
  slugTaken: {
    statusCode: BAD_REQUEST,
    code: 'B-00093',
    message: locale.slugTaken,
  },
  noIdProvider: {
    statusCode: BAD_REQUEST,
    code: 'B-00094',
    message: locale.noIdProvider,
  },
  noParameters: {
    statusCode: BAD_REQUEST,
    code: 'B-00095',
    message: locale.noParameters,
  },
  noProvider: {
    statusCode: BAD_REQUEST,
    code: 'B-00096',
    message: locale.noProvider,
  },
  invalidDoc: {
    statusCode: BAD_REQUEST,
    code: 'B-00097',
    message: locale.invalidDoc,
  },
  docAlreadyExists: {
    statusCode: BAD_REQUEST,
    code: 'B-00098',
    message: locale.docAlreadyExists,
  },
  noRoomToCopy: {
    statusCode: BAD_REQUEST,
    code: 'B-00099',
    message: locale.noRoomToCopy,
  },
  alreadyShared: {
    statusCode: BAD_REQUEST,
    code: 'B-00100',
    message: locale.alreadyShared,
  },
  noBudget: {
    statusCode: BAD_REQUEST,
    code: 'B-00101',
    message: locale.noBudget,
  },
  noBudgetRoom: {
    statusCode: BAD_REQUEST,
    code: 'B-00102',
    message: locale.noBudgetRoom,
  },
  noService: {
    statusCode: BAD_REQUEST,
    code: 'B-00103',
    message: locale.noService,
  },
  noMaterial: {
    statusCode: BAD_REQUEST,
    code: 'B-00104',
    message: locale.noMaterial,
  },
  isAlreadyAdded: {
    statusCode: BAD_REQUEST,
    code: 'B-00105',
    message: locale.isAlreadyAdded,
  },
  percentageError: {
    statusCode: BAD_REQUEST,
    code: 'B-00106',
    message: locale.percentageError,
  },
  percentageNotInt: {
    statusCode: BAD_REQUEST,
    code: 'B-00107',
    message: locale.percentageNotInt,
  },
  noContract: {
    statusCode: BAD_REQUEST,
    code: 'B-00108',
    message: locale.noContract,
  },
  accountError: {
    statusCode: BAD_REQUEST,
    code: 'B-00109',
    message: locale.accountError,
  },
  authError: {
    statusCode: BAD_REQUEST,
    code: 'B-00110',
    message: locale.authError,
  },
  noAuthCode: {
    statusCode: BAD_REQUEST,
    code: 'B-00111',
    message: locale.noAuthCode,
  },
  noPayment: {
    statusCode: BAD_REQUEST,
    code: 'B-00112',
    message: locale.noPayment,
  },
  valueError: {
    statusCode: BAD_REQUEST,
    code: 'B-00113',
    message: locale.valueError,
  },
  cantClone: {
    statusCode: BAD_REQUEST,
    code: 'B-00114',
    message: locale.cantClone,
  },
  invalidURL: {
    statusCode: BAD_REQUEST,
    code: 'B-00115',
    message: locale.invalidURL,
  },
  noPermissions: {
    statusCode: BAD_REQUEST,
    code: 'B-00116',
    message: locale.noPermissions,
  },
  userExceeded: {
    statusCode: BAD_REQUEST,
    code: 'B-00117',
    message: locale.userExceeded,
  },
  userLimit: {
    statusCode: BAD_REQUEST,
    code: 'B-00118',
    message: locale.userLimit,
  },
  fileTooLarge: {
    statusCode: BAD_REQUEST,
    code: 'B-00119',
    message: locale.fileTooLarge,
  },
  proposalFileTooLarge: {
    statusCode: BAD_REQUEST,
    code: 'B-00119',
    message: locale.proposalFileTooLarge,
  },
  supplierNameMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00120',
    message: locale.supplierNameMaxLength,
  },
  websiteMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00121',
    message: locale.websiteMaxLength,
  },
  addressMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00122',
    message: locale.addressMaxLength,
  },
  userTypeNoAccess: {
    statusCode: BAD_REQUEST,
    code: 'B-00123',
    message: locale.userTypeNoAccess,
  },
  invalidDates: {
    statusCode: BAD_REQUEST,
    code: 'B-00124',
    message: locale.invalidDates,
  },
  generalStep: {
    statusCode: BAD_REQUEST,
    code: 'B-00125',
    message: locale.generalStep,
  },
  maxDuration: {
    statusCode: BAD_REQUEST,
    code: 'B-00126',
    message: locale.maxDuration,
  },
  cantCompleteFile: {
    statusCode: BAD_REQUEST,
    code: 'B-00127',
    message: locale.cantCompleteFile,
  },
  invalidGroup: {
    statusCode: BAD_REQUEST,
    code: 'B-00128',
    message: locale.invalidGroup,
  },
  itemsAlreadyGrouped: {
    statusCode: BAD_REQUEST,
    code: 'B-00129',
    message: locale.itemsAlreadyGrouped,
  },
  maxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00130',
    message: locale.maxLength,
  },
  stateMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00131',
    message: locale.stateMaxLength,
  },
  cityMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00132',
    message: locale.cityMaxLength,
  },
  neighborhoodMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00133',
    message: locale.neighborhoodMaxLength,
  },
  emailMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00134',
    message: locale.emailMaxLength,
  },
  updateToken: {
    statusCode: BAD_REQUEST,
    code: 'B-00135',
    message: locale.updateToken,
  },
  brandMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00136',
    message: locale.brandMaxLength,
  },
  storeMaxLength: {
    statusCode: BAD_REQUEST,
    code: 'B-00137',
    message: locale.storeMaxLength,
  },
  uniqueWatcher: {
    statusCode: BAD_REQUEST,
    code: 'B-00138',
    message: locale.uniqueWatcher,
  },
  ancestorConnection: {
    statusCode: BAD_REQUEST,
    code: 'B-00139',
    message: locale.ancestorConnection,
  },
  connectionWithMyself: {
    statusCode: BAD_REQUEST,
    code: 'B-00140',
    message: locale.connectionWithMyself,
  },
  alreadyHasAParentConnection: {
    statusCode: BAD_REQUEST,
    code: 'B-00141',
    message: locale.alreasyHasAParentConnection,
  },
  noConnection: {
    statusCode: BAD_REQUEST,
    code: 'B-00142',
    message: locale.noConnection,
  },
  sequelizeValidation: { statusCode: BAD_REQUEST, code: 'B-00999' },
};

export {
  error,
  NOT_FOUND,
  NOT_ALLOWED,
  UNAUTHORIZED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  TO_MANY_REQUESTS,
  BAD_GATEWAY,
  SERVICE_UNAVAILABLE,
  FORBIDDEN,
  METHOD_NOT_ALLOWED,
};
