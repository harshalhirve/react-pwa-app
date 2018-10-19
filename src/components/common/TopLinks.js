import React from "react";
import { Link } from "react-router-dom";

const TopLinks = () => (
  <tr>
    <td align="center">
      <table border="0" align="center" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <Link to="/dashboard">Dashboard</Link>
            </td>
            <td>&nbsp;&nbsp;|&nbsp;&nbsp;</td>
            <td>
              <Link to="/posts">Posts</Link>
            </td>
            <td>&nbsp;&nbsp;|&nbsp;&nbsp;</td>
            <td>
              <Link to="/news">News</Link>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);

export default TopLinks;
