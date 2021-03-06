import React from "react";
import "../../assets/css/styles.css";

const SuccessMsg = ({ sucMsg }) => (
  <tr>
    <td colSpan="2">
      <table border="0" align="center" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td className="sucMsg">{sucMsg}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);

export default SuccessMsg;
