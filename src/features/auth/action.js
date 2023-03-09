import axios from 'axios';
import {
  message,
} from 'antd';
import axiosApiInstance from '../../services/api';
import {
  SET_AUTH_DATA,
  DATA_LOADING_INIT,
  DATA_LOADING_COMPLETE,
  RESET,
} from './reducer';

const API = process.env.REACT_APP_PUBLIC_URL;
export const signIN = (username, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: DATA_LOADING_INIT });
    const body = {
      username,
      password,
    };
    const result = await axios.post(`${API}/api/auth/sign-in`, body);
    if (result) {
      const { data } = result;
      const user = {
        id: data?.id,
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          user_id: data?.id,
          isAdmin: data?.isAdmin,
          isLoggedIn: true,
        },
      });
      if (!data?.isAdmin) {
        const normalUser = {
          address: data?.address,
          bedRooms: data?.bedRooms,
          propertyType: data?.propertyType,
          evcCode: data?.evcCode,
        };
        dispatch({
          type: SET_AUTH_DATA,
          payload: {
            userDetails: normalUser,
            isDataLoading: false,
          },
        });
      }
      navigate('/dashboard');
    }
  } catch (error) {
    message.error(error?.response?.data?.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
        isLoggedIn: false,
      },
    });
  }
};

export const setAuthData = (name, value) => (dispatch) => {
  dispatch({
    type: SET_AUTH_DATA,
    payload: { [name]: value },
  });
};

export const logOutUser = () => async (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: RESET });
};

export const reAuthenticate = () => async (dispatch) => {
  try {
    const userL = JSON.parse(localStorage.getItem('user'));
    const body = {
      refreshToken: userL?.refreshToken,
    };
    const result = await axiosApiInstance.post('/api/auth/verify-user', body);
    if (result) {
      const { data } = result;
      const user = {
        id: data?.id,
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          user_id: data?.id,
          isAdmin: data?.isAdmin,
          isLoggedIn: true,
        },
      });
      if (!data?.isAdmin) {
        const normalUser = {
          address: data?.address,
          bedRooms: data?.bedRooms,
          propertyType: data?.propertyType,
          evcCode: data?.evcCode,
        };
        dispatch({
          type: SET_AUTH_DATA,
          payload: {
            userDetails: normalUser,
            isDataLoading: false,
          },
        });
      }
    }
  } catch (error) {
    dispatch({ type: RESET });
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
        isLoggedIn: false,
      },
    });
    if (error?.code === 401) {
      localStorage.removeItem('user');
      dispatch({ type: RESET });
    }
  }
};

export const getCostControl = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_LOADING_INIT });
    const result = await axiosApiInstance.get('/api/admin/get-cost-control');
    const { data } = result;
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        electricityDay: data.electricity.day.$numberDecimal,
        electricityNight: data.electricity.night.$numberDecimal,
        gasCost: data.gas.$numberDecimal,
        standingCharge: data.standingCharge.$numberDecimal,
        isDataLoading: false,
      },
    });
  } catch (error) {
    message.error(error?.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
      },
    });
  }
};

export const updateCostControl = (eDay, eNight, gasCost, standingCharges) => async (dispatch) => {
  try {
    dispatch({ type: DATA_LOADING_INIT });
    const body = {
      electricityDay: eDay,
      electricityNight: eNight,
      gas: gasCost,
      standingCharge: standingCharges,
    };
    const response = await axiosApiInstance.put('/api/admin/update-cost-control', body);
    if (response?.data) {
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          isDataLoading: false,
        },
      });
      message.success('updated Cost Control Successfully');
    }
  } catch (error) {
    dispatch({ type: DATA_LOADING_COMPLETE });
    message.error(error?.response.data.message || 'Something went Wrong');
  }
};

export const addEVCCode = (code, price) => async (dispatch) => {
  try {
    const body = {
      code,
      price,
    };
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isEVCModalOpen: false,
        evcRefetch: false,
      },
    });
    const response = await axiosApiInstance.post('/api/admin/add-evc-code', body);
    if (response) {
      message.success('Added Energy Voucher Code Successfully');
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          evcRefetch: true,
        },
      });
    }
  } catch (error) {
    message.error(error.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        evcRefetch: false,
      },
    });
  }
};

export const listEvcCodes = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isEvcLoading: true,
      },
    });
    const result = await axiosApiInstance.get('/api/admin/list-evc-code');
    const { data } = result;
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        EVCCodes: data.evcCodes,
        isEvcLoading: false,
      },
    });
  } catch (error) {
    message.error(error?.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isEvcLoading: false,
      },
    });
  }
};

export const register = (
  {
    userName,
    passwordHash,
    address,
    propertyType,
    evcCodes,
    bedRooms,
    navigate,
  },
) => async (dispatch) => {
  try {
    dispatch({ type: DATA_LOADING_INIT });
    const body = {
      userName,
      password: passwordHash,
      address,
      propertyType,
      bedRooms: Number(bedRooms),
      evcCodes,
    };
    const result = await axios.post(`${API}/api/auth/sign-up`, body);
    if (result) {
      const { data } = result;
      const user = {
        id: data?.id,
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          user_id: data?.id,
          isAdmin: data?.isAdmin,
          isLoggedIn: true,
        },
      });
      if (!data?.isAdmin) {
        const normalUser = {
          address: data?.address,
          bedRooms: data?.bedRooms,
          propertyType: data?.propertyType,
          evcCode: data?.evcCode,
        };
        dispatch({
          type: SET_AUTH_DATA,
          payload: {
            userDetails: normalUser,
            isDataLoading: false,
          },
        });
      }
      message.success('Signup successfully completed. redirecting to Dashboard');
      navigate('/dashboard');
    }
  } catch (error) {
    message.error(error?.response?.data?.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
        isLoggedIn: false,
      },
    });
  }
};

export const addUsage = (electricityDay, electricityNight, gas) => async (dispatch) => {
  try {
    const body = {
      electricityDay,
      electricityNight,
      gas,
    };
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isAddBillModalOpen: false,
        isAddBillLoading: true,
      },
    });
    const response = await axiosApiInstance.post('/api/user/add-usage', body);
    if (response) {
      message.success('Added Energy Usage Successfully');
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          addBIllRefetch: true,
          isAddBillLoading: false,
        },
      });
    }
  } catch (error) {
    message.error(error.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        evcRefetch: false,
      },
    });
  }
};

export const listBillPayment = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isAddBillLoading: true,
      },
    });
    const result = await axiosApiInstance.get('/api/user/list-bill-payment');
    const { data } = result;
    const unpaidBills = data?.billList?.filter((bill) => bill.paid === 'Not Paid');
    const totalBill = unpaidBills?.reduce((total, bill) => total + bill.amount, 0);
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        addBillCodes: data.billList,
        isAddBillLoading: false,
        addBIllRefetch: false,
        totalBill,
        wallet: data.walletBalance,
      },
    });
  } catch (error) {
    message.error(error?.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isAddBillLoading: false,
        addBIllRefetch: false,
      },
    });
  }
};

export const payDue = (totalBill) => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isAddBillLoading: true,
      },
    });
    const body = {
      totalBill,
    };
    const response = await axiosApiInstance.post('/api/user/pay-due', body);
    if (response) {
      message.success(response.message || 'Your Payment was Successful');
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          isAddBillLoading: false,
          addBIllRefetch: true,
        },
      });
    }
  } catch (error) {
    message.error(error.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isAddBillLoading: false,
      },
    });
  }
};

export const recharge = (coupon) => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isRechargeLoading: true,
        isRechargeModalOpen: false,
      },
    });
    const body = {
      coupon,
    };
    const response = await axiosApiInstance.post('/api/user/recharge', body);
    if (response) {
      message.success(response.message || 'Recharge  Successful !');
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          isRechargeLoading: false,
          isRechargeListRefetch: true,
        },
      });
    }
  } catch (error) {
    message.error(error.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isRechargeLoading: false,
      },
    });
  }
};

export const listRecharge = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isRechargeLoading: true,
      },
    });
    const result = await axiosApiInstance.get('/api/user/list-recharge');
    const { data } = result;
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isRechargeList: data.rechargeList,
        isRechargeLoading: false,
        isRechargeListRefetch: false,
        wallet: data.walletBalance,
      },
    });
  } catch (error) {
    message.error(error?.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isRechargeLoading: false,
        isRechargeListRefetch: false,
      },
    });
  }
};

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: true,
      },
    });
    const body = {
      oldPassword,
      newPassword,
    };
    const response = await axiosApiInstance.post('/api/auth/change-password', body);
    if (response) {
      message.success(response.message || 'Password changed Successfully');
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          isDataLoading: false,
        },
      });
    }
  } catch (error) {
    message.error(error.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
      },
    });
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_LOADING_INIT });
    const result = await axiosApiInstance.get('/api/auth/get-user-profile');
    const { data } = result;
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        userData: data?.userDB,
        isDataLoading: false,
      },
    });
  } catch (error) {
    message.error(error?.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
      },
    });
  }
};

export const listUser = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: true,
      },
    });
    const result = await axiosApiInstance.get('/api/admin/list-user');
    const { data } = result;
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        userList: data?.user,
        isDataLoading: false,
        userListRefetch: false,
      },
    });
  } catch (error) {
    message.error(error?.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
        userListRefetch: false,
      },
    });
  }
};

export const userControl = (userId, status) => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: true,
      },
    });
    const body = {
      userId,
      status,
    };
    const response = await axiosApiInstance.post('/api/admin/user-control', body);
    if (response) {
      message.success(response.data.message);
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          isDataLoading: false,
          userListRefetch: true,
        },
      });
    }
  } catch (error) {
    message.error(error.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
        userListRefetch: false,
      },
    });
  }
};

export const listBills = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: true,
      },
    });
    const result = await axiosApiInstance.get('/api/admin/list-bills');
    const { data } = result;
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        billList: data?.bills,
        isDataLoading: false,
        billListRefetch: false,
      },
    });
  } catch (error) {
    message.error(error?.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
        billListRefetch: false,
      },
    });
  }
};

export const payViaAdmin = (billId) => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: true,
      },
    });
    const body = {
      billId,
    };
    const response = await axiosApiInstance.put('/api/admin/update-payment-status', body);
    if (response) {
      message.success(response.data.message);
      dispatch({
        type: SET_AUTH_DATA,
        payload: {
          isDataLoading: false,
          billListRefetch: true,
        },
      });
    }
  } catch (error) {
    message.error(error.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isDataLoading: false,
        billListRefetch: false,
      },
    });
  }
};

export const listStatistics = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isStatisticsLoading: true,
      },
    });
    const result = await axiosApiInstance.get('/api/admin/statistics');
    const { data } = result;
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        statisticsData: data,
        isStatisticsLoading: false,
      },
    });
  } catch (error) {
    message.error(error?.response.data.message || 'Something went Wrong');
    dispatch({
      type: SET_AUTH_DATA,
      payload: {
        isStatisticsLoading: false,
      },
    });
  }
};
