import reducer from "./auth";
import actionTypes from "../actions/actionTypes";
describe("Auth reducer", () => {
  it("should retair n the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store  the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "sometoken",
          userId: "some user id",
        }
      )
    ).toEqual({
      token: "sometoken",
      userId: "some user id",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
