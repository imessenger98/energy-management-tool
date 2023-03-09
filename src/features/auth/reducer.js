export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const DATA_LOADING_INIT = 'DATA_LOADING_INIT';
export const DATA_LOADING_COMPLETE = 'DATA_LOADING_COMPLETE';
export const RESET = 'RESET';
const initialState = {
  isDataLoading: false,
  isAdmin: false,
  isLoggedIn: false,
  userDetails: {},
  user_id: '',
  dashboardSelectedKey: ['1'],
  // access control
  standingCharge: '0.74',
  electricityDay: '0.34',
  electricityNight: '0.2',
  gasCost: '0.1',
  // evc code
  isEVCModalOpen: false,
  isEvcLoading: false,
  EVCCodes: [],
  evcRefetch: false,

  // recharge-user
  isRechargeModalOpen: false,
  isRechargeLoading: false,
  isRechargeList: [],
  isRechargeListRefetch: false,
  wallet: 0,

  // profile
  userData: {},
  // userList
  userList: [],
  userListRefetch: false,
  // billList
  billList: [],
  billListRefetch: false,
  // statistics
  isStatisticsLoading: false,
  statisticsData: {
    totalWalletBalance: '',
    totalUsers: '',
    disabledUsers: '',
    totalsPaidAndUnPaid: '',
    evcLeft: '',
    graph1pie: [],
    graph2pie: [],
    graph3: [],
    graph4: [],
    graph5: [],

  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return { ...state, ...action.payload };
    case DATA_LOADING_INIT:
      return { ...state, isDataLoading: true };
    case DATA_LOADING_COMPLETE:
      return { ...state, isDataLoading: false };
    case RESET:
      return { initialState };
    default:
      return state;
  }
};
