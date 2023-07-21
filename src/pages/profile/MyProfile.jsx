import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Profile from "../../components/Profile/Profile";
import NavigationAction from "../../redux/navigation/action";
import vars from "../../utils/vars";
import { Grid } from "react-loader-spinner";

let { success, error, fetching } = NavigationAction;

const MyProfile = (props) => {
  const { success, error, userDetails, fetching, isFetching } = props;
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    fetching(true);

    await axios
      .get(`${vars.API_URL}/users/${userDetails?.id}`, { headers })
      .then((response) => {
        if (response.status === 200) {
          fetching(false);
          setProfile(response.data);
          success();
        } else {
          fetching(false);
          error();
        }
      })
      .catch((err) => {
        console.log("Error ========>", err);
      });
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);
  return isFetching ? (
    <div className="h-screen flex items-center justify-center">
      <Grid
        height="40"
        width="40"
        color="#ee502e"
        ariaLabel="grid-loading"
        radius="12.5"
        visible={true}
      />
    </div>
  ) : (
    <Profile profile={profile} />
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state?.authentication?.userDetails,
    isFetching: state?.navigation?.isFetching,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { success, error, fetching })
)(MyProfile);
