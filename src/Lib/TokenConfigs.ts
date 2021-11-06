type ConfigsAuthWithData = {
    headers: {
        Authorization: string;
        Data: string;
    };
};

type ConfigsAuth = {
    headers: {
        Authorization: string;
    };
};

type Configs = ConfigsAuth | ConfigsAuthWithData;

export const configs = (token: string, data?: readonly string[]): Configs =>
    data
        ? {
              headers: {
                  Authorization: `Bearer ${token}`,
                  Data: data.toString()
              }
          }
        : {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          };
