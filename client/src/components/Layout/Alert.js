import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  if (alerts && alerts.length > 0) {
    return alerts.map((alert) => {
      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.alertMsg}
        </div>
      );
    });
  } else return null;
};
const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};
export default connect(mapStateToProps)(Alert);
