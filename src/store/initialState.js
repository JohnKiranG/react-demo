const INDEX_PAGE_SIZE_DEFAULT = 5;
const INDEX_PAGE_SIZE_OPTIONS = [];
const paginationMeta = {
  page: 1,
  pageSize: INDEX_PAGE_SIZE_DEFAULT,
  pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
  pageTotal: 1,
  total: 0,
};

export default {
  app: {
    sidemenu: {
      collapsed: false,
    },
    loading: false,
    toaster: '',
  },
  counter: {
    count: 0,
    isIncrementing: false,
    isDecrementing: false,
  },
  placeholder: {
    loading: false,
    list: [],
    receivedAt: null,
  },
  study: {
    loading: false,
    list: {},
  },
  subject: {
    list: {},
    loading: true,
  },
  visit: {
    list: {},
    loading: false,
  },
  site: {
    list: {},
    loading: false,
  },
  studySite: {
    loading: false,
    list: {},
    studySite: {},
    isStale: false,
  },
  field: {
    loading: false,
    list: [],
    receivedAt: null,
    // data: [],
    // field: {},
  },
  dashboard: {
    zadeLoading: false,
    barChartLoading: false,
    barChartminiLoading: false,
    doubleLoopPieLoading: false,
    miniAreaChartLoading: false,
    studyList: [],
    totalSubjects: [],
    receivedAt: null,
    sitesCompliance: [],
    formsCompliance: [],
    dailySubmissionOfForms: [],
    totalSubmissions: null,
  },
  subjectVisitForm: {
    list: [],
    loading: true,
  },
  crfData: {
    list: [],
    loading: true,
  },
  visitForm: {
    list: {},
    loading: false,
  },
  user: {
    id: null,
    token: null,
    name: null,
    userName: null,
    userOrgId: '',
    privileges: [],
    isLicensee: false,
    userOrgType: '',
    canAccessMultipleSites: false,
    userOrgName: '',
    title: '',
    loading: false,
    email: '',
    logo: '',
  },
  session: {
    study: '',
    subject: '',
    visit: '',
    visitOid: '',
    client: '',
    clientName: '',
    site: '',
    form: '',
    fieldGroup: '',
    studySite: '',
    readOnly: false,
  },
  form: {
    loading: false,
    // data: [],
    list: {},
  },
  fieldGroup: {
    data: null,
    list: {},
    loading: false,
  },
  studyTemplate: {
    loading: false,
    list: {},
  },
  clientTemplate: {
    loading: false,
    list: {},
  },
  visitFormEvent: {
    list: {},
    loading: false,
  },
  studyCompliance: {
    studyCompliance: {},
    loading: false,
  },
  clientUser: {
    list: {},
    loading: false,
  },
  role: {
    loading: false,
    list: {},
  },
  crfVersion: {
  },
  tables: {
    subjects: {
      meta: {
        page: 0,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    subjectVisitForms: {
      meta: {
        page: 0,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    auditTrail: {
      meta: {
        page: 0,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    subjectMigration: {
      meta: {
        page: 1,
        pageSize: 10,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    crfVersion: {
      meta: {
        // ...paginationMeta,
        page: 1,
        pageSize: 5,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    deployToProd: {
      meta: {
        page: 1,
        pageSize: 10,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    study: {
      meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    versionInformation: {
      meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    forms: {
      meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
    // users: {
    //   meta: {
    //     page: 1,
    //     pageSize: INDEX_PAGE_SIZE_DEFAULT,
    //     pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    //     pageTotal: 1,
    //     total: 0,
    //   },
    // },
    clinicalData: {
      meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    },
  },
};
